import "dotenv/config";
import "reflect-metadata";
import server from "./server";
import logger from "./logger";
import { SERVER_PORT } from "./config";

server.listen({ port: SERVER_PORT }).then(({ url }) => {
  logger.info(`Server ready at ${url}`);
});
