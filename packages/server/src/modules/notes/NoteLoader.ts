import { mongooseLoader, connectionFromMongoCursor } from "@entria/graphql-mongoose-loader"; //eslint-disable-line
import DataLoader from 'dataloader';
import { ConnectionArguments } from 'graphql-relay';
import Note, { NoteModel } from './NoteModel';
import User, { UserModel } from '../users/UserModel';
import Group, { GroupModel } from '../groups/GroupModel';
import GraphQLContext from '../../types/GraphQLContext';
import getUser from '../../util/getUser';

export default class NoteInterface {
  id: string;

  _id: string;

  title: string;

  content: string;

  createdAt: Date;

  updatedAt: Date;

  group: string;

  constructor(data: NoteModel) {
    this.id = data.id || data._id;
    this._id = data._id;
    this.title = data.title;
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.group = data.group;
  }
}

export const getLoader = () =>
  new DataLoader(ids => mongooseLoader(Note, ids as any));

export const load = async (context, id): Promise<NoteModel> => {
  if (!id) {
    return null;
  }

  try {
    const data = Note.findOne({ _id: id });

    if (!data) return null;

    return data;
  } catch (err) {
    return null;
  }
};

export const loadNotes = async (
  context?: GraphQLContext,
  args?: ConnectionArguments
) => {
  const userId = await getUser(context.req);
  const user = await User.findOne({ _id: userId });
  const where = args.search
    ? {
      title: { //eslint-disable-line
        $regex: new RegExp(`^${args.search}`, 'ig'), //eslint-disable-line
      },//eslint-disable-line
      group: user.group, //eslint-disable-line
    }//eslint-disable-line
    : { //eslint-disable-line
      group: user.group, //eslint-disable-line
    }; //eslint-disable-line
  const todos = Note.find(where, { _id: 1 }).sort({
    createdAt: -1,
  });
  const t = await connectionFromMongoCursor({
    cursor: todos,
    context,
    args,
    loader: load,
  });

  return t;
};

export async function getGroup(
  parentValues: any,
  args: any,
  context: any,
  info: any
): Promise<GroupModel> {
  const group = await Group.findOne({ _id: parentValues.group });
  return group;
}
