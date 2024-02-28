import express from "express";
import { likePost, unlikePost } from "../controller/likeController";

const router = express.Router();
router.route("/:userID/:postID/like").post(likePost);
router.route("/:userID/:postID/un-like").post(unlikePost);

export default router;
