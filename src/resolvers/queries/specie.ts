import { QueryResolvers } from "@/generated/graphql";
import { authorizeSpecie } from "@/guards/specie.guard";
import { getHeroByUri } from "@/services/hero.service";
import { getSpecieById, getSpecieByUri } from "@/services/specie.service";

const specieQueries: QueryResolvers = {
  specie: async (_parent, { id }, ctx) => {
    const user = await ctx.currentUser();

    const specie = await getSpecieById(id);
    await authorizeSpecie(specie.url, user);

    return specie;
  },
  species: async (_parent, _args, ctx) => {
    const user = await ctx.currentUser();
    const hero = await getHeroByUri(user.hero_uri);
    const films = hero.species.map(async (uri) => {
      return getSpecieByUri(uri);
    });

    return films;
  },
};

export default specieQueries;
