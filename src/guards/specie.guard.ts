import { User } from "@/entities/user.entity";
import { getHeroByUri } from "@/services/hero.service";
import { UserID } from "@/types";
import { convertToUser } from "@/utils/guardUtils";
import { ForbiddenError } from "apollo-server";

export const authorizeSpecie = async (uri: string, user: UserID | User) => {
  user = await convertToUser(user);

  const hero = await getHeroByUri(user.hero_uri);
  const authorized = hero.species.includes(uri);

  if (!authorized) {
    throw new ForbiddenError(
      "You don't have permission to access this species"
    );
  }
};
