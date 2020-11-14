import { Resolvers } from "@/generated/graphql";

import authMutations from "./mutations/auth";

const resolvers: Resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {},
};

export default resolvers;
