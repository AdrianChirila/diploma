import { Request, Response } from "express";
import { createUser, editUser, findUser, getUsers, deleteUser } from "../service";
import { omit } from "lodash";
import { log } from "../utils/logger";

export const createUserHandler = async (request: Request, response: Response) => {
  try {
    const user = await createUser(request.body);
    return response.send(omit(user.toJSON(), "password"));
  } catch (error) {
    log.error(error);
    return response.status(409).send((error as { message: string }).message);
  }
};


export const getUsersHandler = async (request: Request, response: Response) => {
    try {
      const users = await getUsers();
      return response.send(users.map(user => omit(user.toJSON(), "password")));
    } catch (error) {
      log.error(error);
      return response.status(409).send((error as { message: string }).message);
    }
  };
  
  export const editUserHandler = async (request: Request, response: Response) => {
    const {
      params: { userId },
      body,
    } = request;
  
    const user = findUser({ userId });
    if (!user) {
      return response.sendStatus(404);
    }
    const updatedUser = await editUser({ userId }, body, { new: true });
    return response.send(updatedUser);
  };
  
  export const deleteUserHandler = async (request: Request, response: Response) => {
    const {
      params: { userId },
    } = request;
    const user = findUser({ userId });
    if (!user) {
      return response.sendStatus(404);
    }
    await deleteUser({ userId });
  
    return response.sendStatus(200);
  };
  