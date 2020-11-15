import { QueryResolvers } from "@/generated/graphql";
import { authorizeFilm } from "@/guards/film.guard";
import { getFilmById } from "@/services/film.service";

const filmQueries: QueryResolvers = {
  film: async (_parent, { id }, ctx) => {
    const user = await ctx.currentUser();

    const film = await getFilmById(id);
    await authorizeFilm(film.url, user);

    return film;
  },
};

export default filmQueries;
