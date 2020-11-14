import { callStartwarsApi } from "./starWars.service";

const BASE_HEROES_PATH = "people/";

export const getHero = async (id: string | number) => {
  const resourcePath = `${BASE_HEROES_PATH}/${id}`;
  const heroData = await callStartwarsApi(resourcePath);

  return heroData;
};

export const getHeroesPage = async (pageNumber: number | string = 1) => {
  const resourcePath = `${BASE_HEROES_PATH}/?page=${pageNumber}`;
  const heroesPage = await callStartwarsApi(resourcePath);

  return heroesPage;
};

export interface HeroResponse {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: Gender;
  created: string;
  edited: string;
  homeworld: string;
  films: string;
  vehicles: string;
  starships: string;
}

export interface HeroPageResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HeroResponse[];
}

export type Gender = "male" | "female" | "n/a" | string; // this makes sense only for autocompletion
