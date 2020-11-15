import { SessionToken } from "@/auth/sessions";
import { ApolloError, AuthenticationError } from "apollo-server";

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

export class AuthError extends AuthenticationError {
  constructor() {
    super("Not authorized");
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class ResourceNotFoundError extends ApolloError {
  constructor() {
    super("Resource not found");
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
}

export interface RequestLikeWithAuthHeaders {
  headers?: {
    authorization?: string;
  };
}
