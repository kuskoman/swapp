import { User } from "@/entities/user.entity";
import { getHeroByUri } from "@/services/hero.service";
import { getUser } from "@/services/user.service";
import { UserID } from "@/types";

export const authorizeFilm = async (uri: string, user: UserID | User) => {
  if (typeof user !== "object") {
    user = (await getUser(user)) as User;
  }

  const hero = await getHeroByUri(user.hero_uri);
  return hero.films.includes(uri);
};
