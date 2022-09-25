import { defaultConfig } from "./congfig/dev";
import { log } from "./utils/logger";
import { connect } from "./database/connect";
import { createServer } from "./utils/server";

const { port, host } = defaultConfig;

export const app = createServer();

app.listen(port, host, () => {
  log.info(`Server is listening at http://${host}:${port}`);
  connect();
});
