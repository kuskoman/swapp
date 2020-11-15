import { SessionToken } from "@/auth/sessions";

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

export class AuthError extends Error {
  constructor() {
    super("Not authorized");
    this.name = "AuthError";
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class ResourceNotFoundError extends Error {
  constructor() {
    super("Resource not found");
    this.name = "ResourceNotFoundError";
    Object.setPrototypeOf(this, ResourceNotFoundError.prototype);
  }
}

export interface RequestLikeWithAuthHeaders {
  headers?: {
    authorization?: string;
  };
}
