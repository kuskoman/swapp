import scalars from "./scalars";

import authMutations from "./mutations/auth";

import heroQueries from "./queries/hero";
import filmQueries from "./queries/film";
import specieQueries from "./queries/specie";

const resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {
    ...heroQueries,
    ...filmQueries,
    ...specieQueries,
  },
  ...scalars,
};

export default resolvers;
