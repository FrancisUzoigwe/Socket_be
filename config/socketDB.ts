import mongoose from "mongoose";

const url: string = "mongodb://127.0.0.1:27017/socketDB";
export const socketDB = async () => {
  mongoose.connect(url).then(() => {
    console.log("Server has been connected");
  });
};
