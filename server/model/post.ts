import { Schema, model, Document } from "mongoose";

export interface PostDocument extends Document {
  title: string;
  content: string;
  description: string;
  img: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
  },
  { timestamps: true },
);

export const Post = model<PostDocument>("Post", PostSchema);
