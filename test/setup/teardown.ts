import { getConnection } from "./connection";

export default async () => {
  const connection = await getConnection();
  if (process.env.NODE_ENV !== "test") {
    console.error("Cannot drop database: NODE_ENV is not set to test");
    process.exit(1);
  }

  await connection.dropDatabase();
  await connection.close();
};
