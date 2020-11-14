import { SessionToken } from "@/auth/sessions";
import { GraphQLError } from "graphql";

export const getAuthorizationToken = (
  request: RequestLikeWithAuthHeaders
): string => {
  const AuthorizationHeader = request?.headers?.authorization;

  if (AuthorizationHeader) {
    const token: string = AuthorizationHeader.replace("Bearer ", "");

    return token;
  }

  throw new AuthError();
};

export const extractBearerToken = (token: string): SessionToken => {
  const bearerString = "Bearer ";
  if (token.startsWith(bearerString)) {
    return token.slice(bearerString.length);
  }

  return token;
};

export class AuthError extends GraphQLError {
  constructor() {
    super("Not authorized");
    this.name = "AuthError";
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export interface RequestLikeWithAuthHeaders {
  headers?: {
    authorization?: string;
  };
}
