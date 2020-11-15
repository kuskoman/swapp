import express from "express";
import { graphqlHTTP } from "express-graphql";
import { getUserId } from "./auth/authorizeApiRequest";
import schema from "./schema";
import { getUser } from "./services/user.service";

const server = express();
server.use("/graphql", (req) => {
  return graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    context: {
      currentUser: async () => {
        const userId = await getUserId(req);
        return getUser(userId);
      },
    },
  });
});

export default server;
