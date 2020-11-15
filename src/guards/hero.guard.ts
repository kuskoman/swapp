import { User } from "@/entities/user.entity";
import { UserID } from "@/types";
import { convertToUser, ForbiddenError } from "@/utils/guardUtils";

export const authorizeHero = async (uri: string, user: UserID | User) => {
  user = await convertToUser(user);
  const authorized = user.hero_uri === uri;
  console.log(user.hero_uri);
  console.log(uri);
  if (!authorized) {
    throw new ForbiddenError();
  }
};
