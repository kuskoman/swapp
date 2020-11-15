import { User } from "@/entities/user.entity";
import { getHeroByUri } from "@/services/hero.service";
import { UserID } from "@/types";
import { convertToUser, ForbiddenError } from "@/utils/guardUtils";

export const authorizeFilm = async (uri: string, user: UserID | User) => {
  user = await convertToUser(user);

  const hero = await getHeroByUri(user.hero_uri);
  const authorized = hero.films.includes(uri);

  if (!authorized) {
    throw new ForbiddenError();
  }
};
