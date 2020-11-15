import server from "@/server";
import { execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { DocumentNode } from "graphql";

export const startTestServer = async () => {
  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch: fetch as any,
  });

  const executeOperation = ({
    query,
    variables = {},
    context = {},
  }: ExecuteOperationInput) => execute(link, { query, variables, context });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};

export interface ExecuteOperationInput {
  query: DocumentNode;
  variables?: Object;
  context?: TestAuthContext | Object;
}

export interface TestAuthContext {
  headers?: {
    Authorization: string;
  };
}
