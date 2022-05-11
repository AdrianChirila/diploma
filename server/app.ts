import express from "express";
import { defaultConfig } from "./config";
import { log } from "./utils/logger";
import { connect } from "./database/connect";
import { routes } from "./routes";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { createTaskManager, validateTaskCounter, deserializeUser } from "./middleware";
import timeout from "connect-timeout";

const { port, host } = defaultConfig;

const app = express();

const taskCounter = createTaskManager(5);

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(timeout("30s"));
app.use(validateTaskCounter(taskCounter));
app.use(deserializeUser);

app.listen(port, host, () => {
  log.info(`Server is listening at http://${host}:${port}`);
  connect();

  routes(app);
});
