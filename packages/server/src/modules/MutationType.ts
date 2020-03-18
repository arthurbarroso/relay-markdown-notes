import { GraphQLObjectType } from 'graphql';
import userMutations from './users/mutations';
import noteMutations from './notes/mutations';
import groupMutations from './groups/mutations';
import { authMutations } from './auth';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...userMutations,
    ...noteMutations,
    ...authMutations,
    ...groupMutations,
  }),
});
