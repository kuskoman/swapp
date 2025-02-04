import logger from "@/logger";
import redis from "@/redis";
import { notEmptyString } from "@/utils/arrayUtils";
import { ResourceNotFoundError } from "@/utils/requestUtils";
import { BaseResponse, PaginationResponse } from "@/utils/swApiUtils";
import { ApolloError } from "apollo-server";
import axios, { AxiosResponse } from "axios";

export const SWAPI_BASE_URL = "http://swapi.dev/api/";

export const callStartwarsApi = async <T>(resource: string): Promise<T> => {
  const uri = getUriForResource(resource);
  return rawCallStarwarsApi(uri);
};

export const rawCallStarwarsApi = async <T>(uri: string): Promise<T> => {
  const type = findUriType(uri);
  const cachedResponse = await getCachedResponse<T>(uri);
  if (cachedResponse) {
    return cachedResponse;
  }

  let response: AxiosResponse<T>;

  try {
    response = await axios.get<T>(uri);
  } catch (e) {
    if (e.response.status == 404) {
      throw new ResourceNotFoundError();
    }
    logger.error(
      `Error when calling external resource (${uri}): ${e.statusText}`
    );
    throw new ExternalServiceError();
  }

  const { data } = response;
  saveResponse(uri, data, type);

  return data;
};

// if it looks stupid but works, it isn't stupid
export const getUriForResource = (resource: string): string => {
  const normalizedResource = resource
    .split("/")
    .filter(notEmptyString)
    .join("/");

  if (normalizedResource.includes("?")) {
    const uri = SWAPI_BASE_URL + normalizedResource;
    return uri;
  }

  const uri = `${SWAPI_BASE_URL}${normalizedResource}/`;

  return uri;
};

export const findUriType = (uri: string): UriType => {
  const lastPart = uri.split("/").filter(notEmptyString).slice(-1)[0];

  if (lastPart.includes("?")) {
    return "pagination";
  }

  return "single";
};

const saveResponse = async (uri: string, data: Object, type: UriType) => {
  const stringifiedResponseData = JSON.stringify(data);
  const key = redisKey(uri);
  redis.setAsync(key, stringifiedResponseData);
  redis.expire(key, 60 * 60 * 24);
  logger.debug(`Cached resource ${uri}`);

  if (type === "pagination") {
    (data as PaginationResponse<BaseResponse>).results.forEach((result) => {
      saveResponse(result.url, result, "single");
    });
  }
};

const getCachedResponse = async <T>(uri: string): Promise<T | null> => {
  const key = redisKey(uri);
  const cachedResponse = await redis.getAsync(key);
  if (cachedResponse) {
    logger.debug(`Got cached resource for ${uri}`);
    const parsedResponse: T = JSON.parse(cachedResponse);
    return parsedResponse;
  }

  return null;
};

const redisKey = (uri: string) => `swapi:${uri}`;

export class ExternalServiceError extends ApolloError {
  constructor() {
    super("Error of external service");
    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }
}

export type UriType = "single" | "pagination";
