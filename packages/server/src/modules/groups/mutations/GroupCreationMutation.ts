import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';
import * as Yup from 'yup';

import Group from '../GroupModel';
import { load } from '../GroupLoader';
import { GroupConnection, UserConnection } from '../../rootType';

import User from '../../users/UserModel';
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
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(4),
      secret: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(args)))
      throw new Error(
        "Validation failed: the name's length should be 4+ and the scret's length should be 6+"
      );
    const { name, secret } = args;

    const user = await getUserId(context.req);
    if (!user) {
      throw new Error('You must be authenticated to perform this');
    }
    const checkOwner = await User.findOne({ _id: user });
    if (!checkOwner.group_owner)
      throw new Error(
        "You aren't a group owner, therefore you can't create a group"
      );
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
