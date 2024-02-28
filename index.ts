import express, { Application } from "express";
import { mainApp } from "./mainApp";
import { socketDB } from "./config/socketDB";

const port: number = 2345;

const app: Application = express();

mainApp(app);
const Server = app.listen(port, () => {
  socketDB();
});

process.on("uncaughtException", (error: any) => {
  console.log("Uncaught exception", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection", reason);

  Server.close(() => {
    process.exit(1);
  });
});
