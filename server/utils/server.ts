import express from "express";
import { routes } from "../routes";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { createTaskManager, validateTaskCounter, deserializeUser } from "../middleware";
import timeout from "connect-timeout";

export const createServer = () => {
  const app = express();

  const taskCounter = createTaskManager(5);

  app.use(json());
  app.use(cors());
  app.use(urlencoded({ extended: false }));
  app.use(timeout("30s"));
  app.use(validateTaskCounter(taskCounter));
  app.use(deserializeUser);

  routes(app);

  return app;
};
