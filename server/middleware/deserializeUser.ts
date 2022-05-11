import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../service";
import { decode } from "../utils/jwt";

export async function deserializeUser(request: Request, response: Response, next: NextFunction) {
  const accessToken = get(request, "headers.authorization", "").replace(/^Bearer\s/, "");
  const refreshToken = get(request, "headers.x-refresh", "");
  if (!accessToken) {
    return next();
  }
  const { decodedToken, expired } = decode(accessToken);
  if (decodedToken) {
    //@ts-expect-error
    request.user = decodedToken;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    if (newAccessToken) {
      response.setHeader("x-access-token", newAccessToken);

      const { decodedToken } = decode(newAccessToken);
      //@ts-expect-error
      request.user = decodedToken;
    }
    return next();
  }
  return next();
}
