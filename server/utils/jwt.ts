import { SignOptions, sign as jwtSign, verify, JwtPayload } from "jsonwebtoken";
import { defaultConfig } from "../congfig/dev";
import { log } from "./logger";

export function sign(obj: Object, options?: SignOptions) {
  return jwtSign(obj, defaultConfig.privateKey, options);
}

export function decode(token: string): { valid: boolean; expired: boolean; decodedToken: string | JwtPayload | null } {
  try {
    const decodedToken = verify(token, defaultConfig.privateKey);
    return { valid: true, expired: false, decodedToken };
  } catch (err) {
    log.error({ err });
    return { valid: false, expired: (err as { message: string }).message === "jwt expired", decodedToken: null };
  }
}
