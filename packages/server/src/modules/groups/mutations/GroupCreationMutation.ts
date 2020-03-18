import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import Group from '../GroupModel';
import { load } from '../GroupLoader';
import { GroupConnection } from '../../rootType';

import hashPassword from '../../../util/hashPassword';
import getUserId from '../../../util/getUser';

interface groupArguments {
  name: string;
  secret: string;
}

const mutation = mutationWithClientMutationId({
  name: 'createGroup',
  inputFields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    secret: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: groupArguments, context) => {
    const { name, secret } = args;

    const user = await getUserId(context.req);
    if (!user) {
      throw new Error('You must be authenticated to perform this');
    }
    const hashed_secret = await hashPassword(secret);
    const newGroup = await Group.create({
      name,
      secret: hashed_secret,
    });

    return {
      id: newGroup._id,
      error: null,
    };
  },
  outputFields: {
    GroupEdge: {
      type: GroupConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const newGroup = await load(context, id);

        if (!newGroup) return null;

        return {
          cursor: toGlobalId('Group', newGroup._id),
          node: newGroup,
        };
      },
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});

export default {
  ...mutation,
};
