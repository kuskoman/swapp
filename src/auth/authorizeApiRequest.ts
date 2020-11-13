import { UserID } from "@/types";
import {
  extractBearerToken,
  getAuthorizationToken,
} from "@/utils/requestUtils";
import { getUserIdFromToken } from "./sessions";

export const getUserId = async (request: any): Promise<UserID> => {
  const token = getAuthorizationToken(request);
  const extractedToken = extractBearerToken(token);
  const userId = await getUserIdFromToken(extractedToken);

  return userId;
};
