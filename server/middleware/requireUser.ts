import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { UserType } from "../model/user";
import { log } from "../utils/logger";

export async function requireUser(request: Request, response: Response, next: NextFunction) {
  const user = get(request, "user");
  log.info(user);
  if (!user) {
    return response.sendStatus(403);
  }

  return next();
}

export async function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const user = get(request, "user.userType");
  if (!user) {
    return response.sendStatus(403);
  }
  if (user !== UserType.Admin) {
    return response.status(403).send("You must be log in as an admin in order to have access to create or edit posts");
  }

  return next();
}
