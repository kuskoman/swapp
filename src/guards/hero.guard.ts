import { User } from "@/entities/user.entity";
import { UserID } from "@/types";
import { convertToUser } from "@/utils/guardUtils";
import { ForbiddenError } from "apollo-server";

export const authorizeHero = async (uri: string, user: UserID | User) => {
  user = await convertToUser(user);
  const authorized = user.hero_uri === uri;

  if (!authorized) {
    throw new ForbiddenError("You don't have permission to access this hero");
  }
};
