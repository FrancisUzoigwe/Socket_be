import { model, Schema, Document, Types } from "mongoose";

interface iAuth {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  country?: string;
  location?: string;
  phoneNumber?: string;
  image?: string;
  imageID?: string;
  posts?: {}[];
  friends: {}[];
}

interface iAuthData extends iAuth, Document {}
const authModel = new Schema<iAuthData>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    country: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
    image: { type: String },
    imageID: { type: String },
    posts: [{ type: Types.ObjectId, ref: "posts" }],
    friends: [
      {
        type: Types.ObjectId,
        ref: "friends",
      },
    ],
  },
  { timestamps: true }
);

export default model<iAuthData>("auths", authModel);
