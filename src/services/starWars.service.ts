import redis from "@/redis";
import axios, { AxiosResponse } from "axios";
import { GraphQLError } from "graphql";

export const SWAPI_BASE_URL = "https://swapi.dev/api/";

export const callStartwarsApi = async <T>(resource: string): Promise<T> => {
  const uri = getUriForResource(resource);
  const cachedResponse = await getCachedResponse<T>(uri);
  if (cachedResponse) {
    return cachedResponse;
  }

  let response: AxiosResponse<T>;

  try {
    response = await axios.get<T>(`${SWAPI_BASE_URL}${resource}`);
  } catch (e) {
    throw new ExternalServiceError();
  }

  const { data } = response;
  const stringifiedResponseData = JSON.stringify(response);
  const key = redisKey(uri);
  redis.setAsync(key, stringifiedResponseData);

  return data;
};

export const getUriForResource = (resource: string): string => {
  const normalizedResource = resource.split("/").join("/");
  const uri = `${SWAPI_BASE_URL}${normalizedResource}/`;

  return uri;
};

const getCachedResponse = async <T>(uri: string): Promise<T | null> => {
  const key = redisKey(uri);
  const cachedResponse = await redis.getAsync(key);
  if (cachedResponse) {
    const parsedResponse = JSON.parse(cachedResponse);
    return parsedResponse;
  }

  return null;
};

const redisKey = (uri: string) => `swapi:${uri}`;

export class ExternalServiceError extends GraphQLError {
  constructor() {
    super("Error of external service");
    this.name = "ExternalServiceError";
    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }
}
