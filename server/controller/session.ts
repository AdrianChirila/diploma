import { Request, Response } from "express";
import { get } from "lodash";
import { defaultConfig } from "../config";
import { createAccessToken, createSession, validatePassword, updateSession, findSessions } from "../service";
import { sign } from "../utils/jwt";

export async function createUserSessionHandler(request: Request, response: Response) {
  const user = await validatePassword(request.body);

  if (!user) {
    return response.status(401).send({ message: "Invalid email or password" });
  }
  // TODO: handle case when `createSession` returns an error
  const session = await createSession(user._id, request.get("user-agent") || "");

  const accessToken = createAccessToken({ user, session });

  const refreshToken = sign(session, { expiresIn: defaultConfig.refreshTokenTimeToLive });

  return response.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(request: Request, response: Response) {
  const sessionId = get(request, "user.session");

  await updateSession({ _id: sessionId }, { valid: false });

  return response.send(200);
}

export async function getUserSessionHandler(request: Request, response: Response) {
  const userId = get(request, "user._id");

  const sessions = await findSessions({ user: userId, valid: true });

  return response.send(sessions);
}
