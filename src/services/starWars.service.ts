import axios, { AxiosResponse } from "axios";
import { GraphQLError } from "graphql";

export const SWAPI_BASE_URL = "https://swapi.dev/api/";

export const callStartwarsApi = async <T>(
  resource: string
): Promise<AxiosResponse<T>> => {
  let response: AxiosResponse<T>;

  try {
    response = await axios.get<T>(`${SWAPI_BASE_URL}${resource}`);
  } catch (e) {
    throw new ExternalServiceError();
  }

  return response;
};

export class ExternalServiceError extends GraphQLError {
  constructor() {
    super("Error of external service");
    this.name = "ExternalServiceError";
    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }
}
