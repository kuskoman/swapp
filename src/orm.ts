import { Connection, createConnection } from "typeorm";

const getConnection = (): Promise<Connection> => {
  return createConnection();
};

export default getConnection;
