import { createAsyncRedisClient } from "./utils/asyncRedis";

const redis = createAsyncRedisClient({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 4002,
  password: process.env.REDIS_PASSWORD || undefined,
  db: process.env.REDIS_DB || undefined,
});

export default redis;
