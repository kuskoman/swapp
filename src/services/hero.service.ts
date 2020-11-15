import { randomInt } from "@/utils/randomUtils";
import { PaginationResponse } from "@/utils/swApiUtils";
import { callStartwarsApi, rawCallStarwarsApi } from "./starWars.service";

export const BASE_HEROES_PATH = "people/";

export const getHeroById = async (id: string | number) => {
  const resourcePath = `${BASE_HEROES_PATH}/${id}`;
  const heroData = await callStartwarsApi<HeroResponse>(resourcePath);

  return heroData;
};

export const getHeroByUri = async (uri: string): Promise<HeroResponse> => {
  return rawCallStarwarsApi(uri);
};

export const getHeroesPage = async (pageNumber: number | string = 1) => {
  const resourcePath = `${BASE_HEROES_PATH}/?page=${pageNumber}`;
  const heroesPage = await callStartwarsApi<HeroPageResponse>(resourcePath);

  return heroesPage;
};

export const getHeroesCount = async (): Promise<number> => {
  const heroesPage = await getHeroesPage();
  const numberOfHeroes = heroesPage.count;

  return numberOfHeroes;
};

export const getRandomHero = async (): Promise<HeroResponse> => {
  const count = await getHeroesCount();
  const randomHeroId = randomInt(count);

  const hero = await getHeroById(randomHeroId);

  return hero;
};

export interface HeroResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  homeworld: string;
  films: string[];
  vehicles: string[];
  starships: string[];
  species: string[];
  url: string;
}

export type HeroPageResponse = PaginationResponse<HeroResponse>;
