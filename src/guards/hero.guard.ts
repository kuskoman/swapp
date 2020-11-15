import { User } from "@/entities/user.entity";
import { UserID } from "@/types";
import { convertToUser, ForbiddenError } from "@/utils/guardUtils";

export const authorizeHero = async (uri: string, user: UserID | User) => {
  user = await convertToUser(user);
  const authorized = user.hero_uri === uri;

  if (!authorized) {
    throw new ForbiddenError();
  }
};
