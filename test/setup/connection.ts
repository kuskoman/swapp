import { Connection, createConnection } from "typeorm";
const config = require("./../../ormconfig");

export const getConnection = async (): Promise<Connection> => {
  const connection = await createConnection({
    type: config.type as "postgres",
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: "test",
    logging: ["error"],
    migrations: config.migrations,
  });

  return connection;
};
