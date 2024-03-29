import { Request, Response } from "express";
import authModel from "../model/authModel";
import postModel from "../model/postModel";

export const likePost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const { userID } = req.params;

    const post: any = await postModel.findById(postID);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await authModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      console.log("User successfully found...");
    }

    if (post.like.includes(userID)) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    } else {
      post.like.push(userID);
      post.save();
      console.log("Posted liked successfully...");
    }

    return res.status(200).json({ message: "Post liked successfully" });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error occurred while liking post",
      error: error.message,
    });
  }
};

export const unlikePost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const { userID } = req.params;

    const post: any = await postModel.findById(postID);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await authModel.findById(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!post.like.includes(userID)) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    post.like.pull(userID);
    post.save();

    return res.status(200).json({ message: "Post unliked successfully" });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error occurred while unliking post",
      error: error.message,
    });
  }
};
