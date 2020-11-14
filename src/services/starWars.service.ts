import axios, { AxiosResponse } from "axios";

export const SWAPI_BASE_URL = "https://swapi.dev/api/";

export const callStartwarsApi = async <T>(
  url: string
): Promise<AxiosResponse<T>> => {
  const response = await axios.get<T>(`https://swapi.dev/api/${url}`);

  return response;
};
