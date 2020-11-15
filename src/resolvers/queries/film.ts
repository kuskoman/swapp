import { QueryResolvers } from "@/generated/graphql";
import { authorizeFilm } from "@/guards/film.guard";
import { getFilmById, getFilmByUri } from "@/services/film.service";
import { getHeroByUri } from "@/services/hero.service";

const filmQueries: QueryResolvers = {
  film: async (_parent, { id }, ctx) => {
    const user = await ctx.currentUser();

    const film = await getFilmById(id);
    await authorizeFilm(film.url, user);

    return film;
  },
  films: async (_parent, _args, ctx) => {
    const user = await ctx.currentUser();
    const hero = await getHeroByUri(user.hero_uri);
    const films = hero.films.map(async (uri) => {
      return getFilmByUri(uri);
    });

    return films;
  },
};

export default filmQueries;
