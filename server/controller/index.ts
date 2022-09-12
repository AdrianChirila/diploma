import { Response } from "express";
import { healthCheckService } from "../service";

export * from "./user";
export * from "./session";
export * from "./post";

export const healthCheckHandler = async (_: Request, response: Response) => {
  return response.send(`
  Api Status: 200
  <br/>
  ${healthCheckService()}
  `);
};
