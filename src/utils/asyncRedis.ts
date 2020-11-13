import { ClientOpts, RedisClient } from "redis";

export class RedisAsyncClient extends RedisClient {
  constructor(options: ClientOpts) {
    super(options);
  }

  /* getAsync works exactly like normal get except
    that instead of taking callback as argument uses
    promise. In case when key does not exist returns
    null what is considered as a truthy value */
  public async getAsync(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.get(key, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }

  /* setAsync works exactly like normal set except
    using promise instead of callback */
  public async setAsync(key: string, value: string): Promise<"OK"> {
    return new Promise((resolve, reject) => {
      this.set(key, value, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }
}

export const createAsyncRedisClient = (
  options?: ClientOpts
): RedisAsyncClient => {
  return new RedisAsyncClient(options || {});
};
