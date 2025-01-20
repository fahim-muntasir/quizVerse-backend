import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

const middleware = (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
};

export default middleware;
