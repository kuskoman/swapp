import scalars from "./scalars";

import authMutations from "./mutations/auth";

const resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {},
  ...scalars,
};

export default resolvers;
