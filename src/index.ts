import "dotenv/config";
import "reflect-metadata";
import server from "./server";
import logger from "./logger";

const port = process.env.SERVER_PORT || 4000;

server.listen({ port }).then(({ url }) => {
  logger.info(`Server ready at ${url}`);
});
