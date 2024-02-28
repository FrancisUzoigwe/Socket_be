import { Request, Response } from "express";
import authModel from "../model/authModel";
import postModel from "../model/postModel";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { text, image } = req.body;
    const user = await authModel.findById(userID);
    if (user) {
      const posts = await postModel.create({ author: userID, text, image });
      return res.status(201).json({
        message: "Successfully created a post",
        data: posts,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postModel.find().sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: `Viewing ${posts?.length} posts `,
      data: posts,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const getOnePost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const post = await postModel.findById(postID);
    return res.status(200).json({
      message: "Successfully gotten a post",
      data: post,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;
    const post = await postModel.findByIdAndDelete(postID);
    return res.status(201).json({
      message: "Successfully deleted",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured while deleting post",
      data: error?.message,
    });
  }
};
