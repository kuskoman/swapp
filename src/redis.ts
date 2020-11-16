import { REDIS_DB, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./config";
import { createAsyncRedisClient } from "./utils/asyncRedis";

const redis = createAsyncRedisClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  db: REDIS_DB,
});

export default redis;
