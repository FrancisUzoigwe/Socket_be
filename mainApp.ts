import { Application, Request, Response, json } from "express";
import cors from "cors";
import morgan from "morgan";
import auth from "./router/authRouter";
import post from "./router/postRouter";
import like from "./router/likeRouter";
export const mainApp = (app: Application) => {
  app.use(json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "DELETE", "POST", "PATCH"],
    })
  );
  app.use(morgan("dev"));
  app.use("/", auth);
  app.use("/post", post);
  app.use("/like", like);
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        message: "Successfully using Francis Uzoigwe's Socket.io API",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: "Error occured",
        data: error?.message,
      });
    }
  });
};
