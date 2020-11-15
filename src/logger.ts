import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "debug",
});

switch (process.env.NODE_ENV) {
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
