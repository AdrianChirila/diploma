const user = process.env.APP_SERVER_DB ?? "denis";
const password = process.env.APP_SERVER_PASS_DB ?? "padUserPass";
const port = parseInt(process.env.APP_SERVER_PORT ?? "5050");
const host = process.env.APP_SERVER_HOST ?? "localhost";
const privateKey = process.env.APP_PRIVATE_KEY ?? "";

export const defaultConfig = {
  port,
  host,
  dbUrl: `mongodb+srv://${user}:${password}@cluster0.a7vad.mongodb.net/user?retryWrites=true&w=majority`,
  SALT_WORK_FACTOR: 15,
  accessTokenTimeToLive: "15m",
  refreshTokenTimeToLive: "30m",
  privateKey,
};
