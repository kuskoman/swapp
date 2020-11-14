module.exports = {
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 4001,
  username: process.env.DB_USER || "sw",
  password: process.env.DB_PASS || "sw",
  database: process.env.NODE_ENV === "test" ? "test" : "sw",
  entities: [
    process.env.NODE_ENV === "test"
      ? "./src/**/*.entity.ts"
      : "./dist/**/*.entity.js",
  ],
  synchronize: false,
  migrationsRun: process.env.NODE_ENV === "development",
  logging: true,
  migrations: ["./dist/migrations/**/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
