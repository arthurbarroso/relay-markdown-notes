import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import { connectionArgs, globalIdField, fromGlobalId } from 'graphql-relay';
import {
  NoteType,
  NoteConnection,
  UserType,
  UserConnection,
  GroupConnection,
} from './rootType';
import { loadNotes, load } from './notes/NoteLoader';
import { loadUsers } from './users/UserLoader';
import { loadGroups } from './groups/GroupLoader';
import { nodeField } from '../types/nodeInterface';
import GraphQLContext from '../types/GraphQLContext';

/*

*/

export default new GraphQLObjectType<any, GraphQLContext, any>({
  name: 'Query',
  description: 'Main query',
  fields: () => ({
    id: globalIdField('id'),
    node: nodeField,

    users: {
      type: GraphQLNonNull(UserConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, context) => loadUsers(context, args),
    },

    note: {
      type: NoteType,
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, { id }, context) => load(context, fromGlobalId(id).id),
    },

    notes: {
      type: GraphQLNonNull(NoteConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, context) => loadNotes(context, args),
    },

    groups: {
      type: GraphQLNonNull(GroupConnection.connectionType),
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args, context) => loadGroups(context, args),
    },
  }),
});
