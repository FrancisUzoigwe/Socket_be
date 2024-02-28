import { model, Schema, Document, Types } from "mongoose";

interface iPost {
  author?: string;
  image?: string;
  imageID?: string;
  text?: string;
  like?: {}[];
}

interface iPostData extends iPost, Document {}
const postModel = new Schema<iPostData>(
  {
    author: { type: String },
    image: { type: String },
    imageID: { type: String },
    text: { type: String },
    like: [{ type: Types.ObjectId, ref: "likes" }],
  },
  { timestamps: true }
);

export default model<iPostData>("posts", postModel);
