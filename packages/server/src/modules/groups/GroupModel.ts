import mongoose, { Document, Schema } from 'mongoose';

export type GroupModel = Document & {
  name: string;
};

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
      hidden: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<GroupModel>('Group', GroupSchema);
