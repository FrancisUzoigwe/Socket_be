import express from "express";
import {
  deleteAuth,
  getAllAuth,
  getOneAuth,
  registerAuth,
  signinAuth,
  updateAuthImage,
  updateAuthInfo,
} from "../controller/authController";
import multer from "multer";

const uploads = multer().single("image");

const router = express.Router();
router.route("/register").post(registerAuth);
router.route("/signin").post(signinAuth);
router.route("/:userID/update-info").patch(updateAuthInfo);
router.route("/:userID/update-image").patch(uploads, updateAuthImage);
router.route("/:userID/delete").delete(deleteAuth);
router.route("/:userID/get-one-auth").get(getOneAuth);
router.route("/get-all-auth").get(getAllAuth);

export default router;
