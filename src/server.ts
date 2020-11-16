import { getUserId } from "./auth/authorizeApiRequest";
import schema from "./schema";
import { getUser } from "./services/user.service";
import { Context } from "./types";
import { ApolloServer } from "apollo-server";
import apolloLogger from "./loggingPlugin";
import { NODE_ENV } from "./config";

const isDevelopment = NODE_ENV === "development";

const server = new ApolloServer({
  schema,
  context: async ({ req }: any): Promise<Context> => ({
    ...req,
    currentUser: async () => {
      const userId = await getUserId(req);
      return getUser(userId);
    },
  }),
  plugins: [apolloLogger],
  subscriptions: false,
  playground: isDevelopment,
  debug: isDevelopment,
  tracing: isDevelopment,
});

export default server;
