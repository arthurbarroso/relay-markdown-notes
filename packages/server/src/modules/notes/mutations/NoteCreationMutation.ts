import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import Note from '../NoteModel';
import User from '../../users/UserModel';
import { load } from '../NoteLoader';
import { NoteConnection } from '../../rootType';

import getUserId from '../../../util/getUser';

interface noteArguments {
  title: string;
  content: string;
}

const mutation = mutationWithClientMutationId({
  name: 'createNote',
  inputFields: {
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    content: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: noteArguments, context) => {
    const { title, content } = args;
    const userId = await getUserId(context.req);
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    console.log(user);
    if (!user.group) {
      throw new Error(
        "You aren't in a group therefore you aren't allowed to create notes"
      );
    }
    const newTodo = await Note.create({
      title,
      content,
      group: user.group,
    });

    return {
      id: newTodo._id,
      error: null,
    };
  },
  outputFields: {
    NoteEdge: {
      type: NoteConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const newNote = await load(context, id);

        if (!newNote) return null;

        return {
          cursor: toGlobalId('Note', newNote._id),
          node: newNote,
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
