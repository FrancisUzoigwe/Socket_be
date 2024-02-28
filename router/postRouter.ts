import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePost,
} from "../controller/postController";
import multer from "multer";

const uploads = multer().single("image");
const router = express.Router();
router.route("/:userID/create-post").post(uploads, createPost);
router.route("/get-all-post").get(getAllPosts);
router.route("/:postID/get-one-post").get(getOnePost);
router.route("/:postID/delete-post").delete(deletePost);

export default router;
