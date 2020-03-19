import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import User from '../UserModel';
import { load } from '../UserLoader';
import { UserConnection } from '../../rootType';

import GraphQLContext from '../../../types/GraphQLContext';

import getUserId from '../../../util/getUser';

interface ToGroupOwner {
  userId: string;
}

const mutation = mutationWithClientMutationId({
  name: 'makeGroupOwner',
  inputFields: {
    userId: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: ToGroupOwner, context: GraphQLContext) => {
    const { userId } = args;

    const adminId = await getUserId(context.req);
    const user = await User.findOne({ _id: adminId });
    if (!user.admin)
      throw new Error(
        "You aren't an admin. You can't edit other users profiles"
      );

    const updatedUser = await User.findOne({ _id: userId });

    await updatedUser.update({
      group_owner: true,
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
