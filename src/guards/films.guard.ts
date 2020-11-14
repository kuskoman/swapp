import { User } from "@/entities/user.entity";
import { getUser } from "@/services/user.service";
import { UserID } from "@/types";
import { ForbiddenError } from "@/utils/guardUtils";

export const authorizeFilm = async (uri: string, user: User | UserID) => {
  if (typeof user === "number") {
    user = (await getUser(user)) as User;
  }

  if (user.hero_uri !== uri) {
    throw new ForbiddenError();
  }
};
