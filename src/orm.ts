import { Connection, createConnection } from "typeorm";

let connection: Connection;

const getConnection = async (): Promise<Connection> => {
  if (!connection) {
    connection = await createConnection();
  }
  return connection;
};

export default getConnection;
