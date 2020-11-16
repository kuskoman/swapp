import {
  apolloLogPlugin,
  UserOptions,
} from "@est-normalis/simple-apollo-logger";
import logger from "./logger";
import { NODE_ENV } from "./config";

const ops: UserOptions = {
  ignoreSchemaRequest: NODE_ENV === "development",
  variableFilter: {
    keywords: ["password", "oldPassword", "newPassword"],
    replacementText: "[FILTERED]",
  },
  logger: (msg: string) => {
    logger.http(msg);
  },
};

const loggingPlugin = apolloLogPlugin(ops);

export default loggingPlugin;
