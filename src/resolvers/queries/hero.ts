import { QueryResolvers } from "@/generated/graphql";
import { authorizeHero } from "@/guards/hero.guard";
import { getHeroById, getHeroByUri } from "@/services/hero.service";

const heroQueries: QueryResolvers = {
  hero: async (_parent, { id }, ctx) => {
    const user = await ctx.currentUser();

    if (id) {
      const hero = await getHeroById(id);
      await authorizeHero(hero.url, user);
      return hero;
    }

    const heroUri = user.hero_uri;
    return getHeroByUri(heroUri);
  },
};

export default heroQueries;
