import mongoose, { Document, Schema } from 'mongoose';

export type UserModel = Document & {
  username: string;
  email: string;
  password: string;
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      hidden: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: false,
    },
    group_owner: {
      type: Boolean,
      default: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserModel>('User', UserSchema);
