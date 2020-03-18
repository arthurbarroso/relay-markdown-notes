import { GraphQLNonNull, GraphQLString } from 'graphql';
import bcrypt from 'bcryptjs';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import User from '../UserModel';
import Group from '../../groups/GroupModel';
import { load } from '../UserLoader';
import { UserConnection } from '../../rootType';

import GraphQLContext from '../../../types/GraphQLContext';

import getUserId from '../../../util/getUser';

interface GroupAssign {
  groupId: string;
  secret: string;
}

const mutation = mutationWithClientMutationId({
  name: 'assignGroup',
  inputFields: {
    groupId: {
      type: GraphQLNonNull(GraphQLString),
    },
    secret: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: GroupAssign, context: GraphQLContext) => {
    const { groupId, secret } = args;
    const _id = groupId;
    const group = await Group.findOne({
      _id,
    });
    if (!group) {
      throw new Error('No group found with that id');
    }

    const match = await bcrypt.compare(secret, group.secret);
    if (!match) {
      throw new Error('Invalid secret');
    }

    const userId = await getUserId(context.req);
    const user = await User.findOne({ _id: userId });

    await user.update({
      group: group._id,
    });

    return {
      id: user._id,
      error: null,
    };
  },
  outputFields: {
    userEdge: {
      type: UserConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const updated = await load(context, id);

        if (!updated) return null;

        return {
          cursor: toGlobalId('User', updated._id),
          node: updated,
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
