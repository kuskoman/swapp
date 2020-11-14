import { getConnection } from "./connection";
import { execute } from "./execute";

export default async () => {
  await execute("yarn build");
  const connection = await getConnection();
  if (process.env.NODE_ENV !== "test") {
    console.error("Cannot create database: NODE_ENV is not set to test");
    process.exit(1);
  }

  const runner = connection.createQueryRunner();
  await runner.createDatabase("test", true);
  await connection.runMigrations();
  await connection.close();
};
