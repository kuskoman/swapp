import { GraphQLError } from "graphql";

export class ForbiddenError extends GraphQLError {
  constructor() {
    super("Forbidden");
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
