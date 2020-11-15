import { callStartwarsApi, rawCallStarwarsApi } from "./starWars.service";

export const BASE_FILMS_PATH = "films/";

export const getFilmById = async (
  id: string | number
): Promise<FilmResponse> => {
  const resourcePath = `${BASE_FILMS_PATH}/${id}`;
  const heroData = await callStartwarsApi<FilmResponse>(resourcePath);

  return heroData;
};

export const getFilmByUri = async (uri: string): Promise<FilmResponse> => {
  return rawCallStarwarsApi(uri);
};

export interface FilmResponse {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  relase_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}
