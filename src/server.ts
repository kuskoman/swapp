import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const server = express();
server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

export default server;
