import { Express } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  editUserHandler,
  getUsersHandler,
  getUserHandler,
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  getPostsHandler,
  getPostHandler,
  healthCheckHandler,
} from "./controller";
import { createUserSchema, editUserSchema, createSessionSchema, createPostSchema, getUserSchema } from "./schema";
import { validateRequest, requireUser, requireAdmin } from "./middleware";

export const routes = (app: Express) => {
  /**
   *  HealthCheck
   * /healthcheck
   */
  //@ts-expect-error
  app.get("/healthcheck", healthCheckHandler);

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
   *  Get user
   *  /users
   */
  app.post("/user", validateRequest(getUserSchema), getUserHandler);
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

  //#region Posts
  /**
   *  Create post
   *  /posts/create
   */
  app.post("/posts/create", [requireAdmin, validateRequest(createPostSchema)], createPostHandler);
  /**
   *  Update post
   *  /posts/edit/:postId
   */
  app.put("/posts/edit/:postId", [requireAdmin, validateRequest(createPostSchema)], updatePostHandler);
  /**
   *  Delete post
   *  /posts/delete/:postId
   */
  app.delete("/posts/delete/:postId", requireAdmin, deletePostHandler);
  /**
   *  Get post
   *  /posts/:postId
   */
  app.get("/posts/:postId", requireUser, getPostHandler);
  /**
   *  Get posts
   *  /posts
   */
  app.get("/posts", requireUser, getPostsHandler);
  //#endregion
};
