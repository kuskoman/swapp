import authMutations from "./mutations/auth";

const resolvers = {
  Mutation: {
    ...authMutations,
  },
  Query: {},
};

export default resolvers;
