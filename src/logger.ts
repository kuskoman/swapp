import { createLogger, format, transports } from "winston";
import { NODE_ENV } from "./config";

const logger = createLogger({
  level: "debug",
});

switch (NODE_ENV) {
  case "development":
    logger.add(new transports.Console({ format: format.cli() }));
    break;
  case "production":
    logger.add(new transports.Console({ format: format.simple() }));
    break;
  case "test":
    logger.add(
      new transports.Console({ level: "error", format: format.simple() })
    );
    break;
}

export default logger;
