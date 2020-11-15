import { QueryResolvers } from "@/generated/graphql";
import { getHeroByUri } from "@/services/hero.service";

const heroQueries: QueryResolvers = {
  hero: async (_parent, _args, ctx) => {
    const user = await ctx.currentUser();
    const heroUri = user.hero_uri;
    return getHeroByUri(heroUri);
  },
};

export default heroQueries;
