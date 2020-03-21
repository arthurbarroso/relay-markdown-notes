import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import Note from '../NoteModel';
import User from '../../users/UserModel';
import { load } from '../NoteLoader';
import { NoteConnection } from '../../rootType';

import getUserId from '../../../util/getUser';

interface noteArguments {
  _id: string;
}

const mutation = mutationWithClientMutationId({
  name: 'deleteNote',
  inputFields: {
    _id: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (args: noteArguments, context) => {
    const { _id } = args;
    const userId = await getUserId(context.req);
    const user = await User.findOne({ _id: userId });
    if (!user.group) {
      throw new Error(
        "You aren't in a group therefore you aren't allowed to do that"
      );
    }

    const note = await Note.findOne({ _id });
    if (!note.group === user.group)
      throw new Error("You aren't allowed to delete notes outside your group");
    const deleted = await Note.findOneAndDelete({ _id });

    return {
      id: deleted._id,
      error: null,
    };
  },
  outputFields: {
    NoteEdge: {
      type: NoteConnection.edgeType,
      resolve: async ({ id }, _, context) => {
        const deletedNote = await load(context, id);

        if (!deletedNote) return null;

        return {
          cursor: toGlobalId('Note', deletedNote._id),
          node: deletedNote,
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
