import { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcrypt";
import { streamUpload } from "../config/streamifier";

export const registerAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await authModel.create({ email, password: hashed });
    return res.status(201).json({
      message: "Success",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const signinAuth = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await authModel.findOne({ email });
    if (user) {
      const checked = await bcrypt.compare(password, user?.password!);
      if (checked) {
        return res.status(200).json({
          message: "Password correct",
          data: user,
        });
      } else {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const updateAuthInfo = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { firstName, lastName, country, location, phoneNumber } = req.body;
    const user = await authModel.findById(userID);
    if (user) {
      const updates = await authModel.findByIdAndUpdate(
        userID,
        {
          firstName,
          lastName,
          country,
          location,
          phoneNumber,
        },
        { new: true }
      );

      return res.status(201).json({
        message: "Successfully updated",
        data: updates,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: error?.message,
    });
  }
};

export const updateAuthImage = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);
    const { secure_url, public_url }: any = await streamUpload(req);
    if (user) {
      const update = await authModel.findByIdAndUpdate(
        userID,
        {
          image: secure_url,
          imageID: public_url,
        },
        {
          new: true,
        }
      );
      return res.status(201).json({
        message: "Successfully update image",
        data: update,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const deleteAuth = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findByIdAndDelete(userID);
    return res.status(201).json({
      message: "Successfully deleted auth",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error deleting auth",
      data: error?.message,
    });
  }
};

export const getOneAuth = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);
    return res.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};

export const getAllAuth = async (req: Request, res: Response) => {
  try {
    const auths = await authModel.find().sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: `Viewing ${auths?.length} auths `,
      data: auths,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error occured",
      data: error?.message,
    });
  }
};
