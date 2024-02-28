import { model, Schema, Document, Types } from "mongoose";

interface iLike {
  users?: {}[];
}

interface iLikeData extends iLike, Document {}
const likeModel = new Schema<iLikeData>(
  {
    users: [{ type: Types.ObjectId, ref: "posts" }],
  },
  { timestamps: true }
);

export default model<iLikeData>("likes", likeModel);
