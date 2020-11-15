import scalars from "./scalars";

import authMutations from "./mutations/auth";

import heroQueries from "./queries/hero";
import filmQueries from "./queries/film";

const resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {
    ...heroQueries,
    ...filmQueries,
  },
  ...scalars,
};

export default resolvers;
