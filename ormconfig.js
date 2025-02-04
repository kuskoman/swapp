module.exports = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 4001,
  username: process.env.DB_USER || "sw",
  password: process.env.DB_PASS || "sw",
  database: process.env.NODE_ENV === "test" ? "test" : "sw",
  entities: [
    process.env.NODE_ENV === "production"
      ? "./dist/**/*.entity.js"
      : "./src/**/*.entity.ts",
  ],
  synchronize: false,
  migrationsRun: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV !== "test",
  migrations: ["./dist/migrations/**/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
