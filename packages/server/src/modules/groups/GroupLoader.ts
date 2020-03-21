import { mongooseLoader, connectionFromMongoCursor } from "@entria/graphql-mongoose-loader"; //eslint-disable-line
import DataLoader from 'dataloader';
import { ConnectionArguments } from 'graphql-relay';
import Group, { GroupModel } from './GroupModel';
import User, { UserModel } from '../users/UserModel';
import { load as userloader } from '../users/UserLoader';
import GraphQLContext from '../../types/GraphQLContext';
import Note, { NoteModel } from '../notes/NoteModel';
import { load as noteloader } from '../notes/NoteLoader';

export default class NoteInterface {
  id: string;

  _id: string;

  name: string;

  secret: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: GroupModel) {
    this.id = data.id || data._id;
    this._id = data._id;
    this.name = data.name;
    this.secret = data.secret;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export const getLoader = () =>
  new DataLoader(ids => mongooseLoader(Group, ids as any));

export const load = async (context, id): Promise<GroupModel> => {
  if (!id) {
    return null;
  }

  try {
    const data = Group.findOne({ _id: id });

    if (!data) return null;

    return data;
  } catch (err) {
    return null;
  }
};

export const loadGroups = async (
  context?: GraphQLContext,
  args?: ConnectionArguments
) => {
  const where = args.search
    ? {
      title: { //eslint-disable-line
        $regex: new RegExp(`^${args.search}`, 'ig'), //eslint-disable-line
      },//eslint-disable-line
    }//eslint-disable-line
    : { //eslint-disable-line
    }; //eslint-disable-line
  const groups = Group.find(where, { _id: 1 }).sort({
    createdAt: -1,
  });
  const t = await connectionFromMongoCursor({
    cursor: groups,
    context,
    args,
    loader: load,
  });

  return t;
};

export async function getGroupUsers(
  parentValues: any,
  args?: any,
  context?: any,
  info?: any
) {
  const users = User.find({ group: parentValues._id });
  const t = await connectionFromMongoCursor({
    cursor: users,
    context,
    args,
    loader: userloader,
  });
  return t;
}

export async function getGroupNotes(
  parentValues: any,
  args?: any,
  context?: any,
  info?: any
) {
  const notes = Note.find({ group: parentValues._id });
  const t = await connectionFromMongoCursor({
    cursor: notes,
    context,
    args,
    loader: noteloader,
  });
  return t;
}
