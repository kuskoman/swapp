import scalars from "./scalars";

import authMutations from "./mutations/auth";

import heroQueries from "./queries/hero";

const resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {
    ...heroQueries,
  },
  ...scalars,
};

export default resolvers;
