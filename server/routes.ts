import { Express, Request, Response } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getUsersHandler,
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionHandler,
} from "./controller";
import { createUserSchema, editUserSchema, createSessionSchema } from "./schema";
import { validateRequest, requireUser } from "./middleware";

export const routes = (app: Express) => {
  /**
   *  HealthCheck
   * /healthcheck
   */
  app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));

  //#region Users
  /**
   *  Create user
   *  /users/create
   */
  app.post("/users/create", validateRequest(createUserSchema), createUserHandler);
  /**
   *  Edit user
   *  /users/edit/:userId
   */
  app.put("/users/edit/:userId", validateRequest(editUserSchema), editUserHandler);
  /**
   *  Get users
   *  /users
   */
  app.get("/users", getUsersHandler);
  /**
   *  Delete user
   *  /users/delete/:userId
   */
  app.delete("/users/delete/:userId", deleteUserHandler);
  //#endregion

  //#region Session
  /**
   *  Create session
   *  /sessions
   */
  app.post("/sessions", validateRequest(createSessionSchema), createUserSessionHandler);
  /**
   *  Get user's sessions
   *  /sessions
   */
  app.get("/sessions", requireUser, getUserSessionHandler);
  /**
   *  Logout
   *  /sessions
   */
  app.delete("/sessions", requireUser, invalidateUserSessionHandler);
  //#endregion
};
