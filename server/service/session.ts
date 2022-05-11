import { FilterQuery, LeanDocument, UpdateQuery } from "mongoose";
import { Session, SessionDocument, UserDocument } from "../model";
import { defaultConfig } from "../config";
import { decode, sign } from "../utils/jwt";
import { get } from "lodash";
import { findUser } from "./user";

export async function createSession(
  userId: string,
  userAgent: string,
): Promise<Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>> {
  try {
    const session = await Session.create({ user: userId, userAgent });
    return session.toJSON() as Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>;
  } catch (error) {
    throw new Error((error as { message: string }).message);
  }
}

export function createAccessToken({
  user,
  session,
}: {
  user: Omit<UserDocument, "password"> | LeanDocument<Omit<UserDocument, "password">>;
  session: Omit<SessionDocument, "password"> | LeanDocument<Omit<SessionDocument, "password">>;
}) {
  const accessToken = sign({ ...user, session: session._id }, { expiresIn: defaultConfig.accessTokenTimeToLive });
  return accessToken;
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  const { decodedToken } = decode(refreshToken);

  if (!decodedToken || !get(decodedToken, "_id")) {
    return false;
  }

  const session = await Session.findById(!get(decodedToken, "_id"));

  if (!session || !session.valid) {
    return false;
  }

  const user = await findUser({ id: session.id });

  if (!user) {
    return false;
  }

  const accessToken = createAccessToken({ user, session });

  return accessToken;
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return Session.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}
