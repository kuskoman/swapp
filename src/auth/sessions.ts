import redis from "@/redis";
import { UserID } from "@/types";
import { hashData } from "@/utils/cryptoUtils";
import { randomBase64Url } from "@/utils/randomUtils";

/* generateToken takes userId and creates session key, its hash and session identifier.
 * Sessions are "generally" namespaced ("session:"), and every user has his session namespaced to
 * userId. Function saves session hash to database, but does not preserve session key-
 * once its sent to user server should acquire no knoweledge about its content */
export const generateToken = async (userId: UserID): Promise<string> => {
  const key = randomBase64Url(48);
  const hash = hashData(key);
  const randomString = randomBase64Url(8);
  const sessionIdentifier = `${userId}:${randomString}`;
  const stringifiedSessionInfo = stringifySessionInfo(hash, userId);

  redis.setAsync(`session:${sessionIdentifier}`, stringifiedSessionInfo);

  return `${sessionIdentifier}:${key}`;
};

/* getUserIdFromToken splits token for session identifier and its hash,
 * then finds session informations using the identifier. If key provided
 * matches hash in database function returns user */
export const getUserIdFromToken = async (
  token: SessionToken
): Promise<UserID> => {
  const { sessionIdentifier, keyHash } = decodeToken(token);

  const redisResponse = await redis.getAsync(`session:${sessionIdentifier}`);

  if (!redisResponse || redisResponse === null) {
    throw new Error(invalidSessionKeyMessage);
  }

  const sessionInfo: SessionInfo = JSON.parse(redisResponse);

  const hashValid = sessionInfo.hash === keyHash;
  if (!hashValid) {
    throw new Error(invalidSessionKeyMessage);
  }

  return sessionInfo.userId;
};

const stringifySessionInfo = (hash: string, userId: string): string => {
  const sessionInfo: SessionInfo = {
    hash,
    userId,
  };

  const stringifiedSessionInfo = JSON.stringify(sessionInfo);

  return stringifiedSessionInfo;
};

const decodeToken = (token: string): DecodedSessionToken => {
  const tokenParts = token.split(":");
  if (tokenParts.length !== 3) {
    throw new Error(invalidSessionKeyMessage);
  }
  const sessionIdentifier = tokenParts.slice(0, 2).join(":");
  const key = tokenParts[2];
  const keyHash = hashData(key);

  return { sessionIdentifier, keyHash };
};

const invalidSessionKeyMessage = "Invalid session key";

interface DecodedSessionToken {
  sessionIdentifier: string;
  keyHash: string;
}

export type SessionToken = string;

export interface SessionInfo {
  hash: string;
  userId: UserID;
}
