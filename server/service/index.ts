import mongoose from "mongoose";
export * from "./user";
export * from "./session";
export * from "./post";

export function healthCheckService(): string {
  return `Db status: ${mongoose.connection.readyState}`;
}
