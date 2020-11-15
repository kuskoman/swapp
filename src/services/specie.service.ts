import { PaginationResponse, validateId } from "@/utils/swApiUtils";
import { callStartwarsApi, rawCallStarwarsApi } from "./starWars.service";

export const BASE_SPECIES_PATH = "species/";

export const getSpecieById = async (id: string | number) => {
  validateId(id);
  const resourcePath = `${BASE_SPECIES_PATH}/${id}`;
  const heroData = await callStartwarsApi<SpeciesResponse>(resourcePath);

  return heroData;
};

export const getSpecieByUri = async (uri: string): Promise<SpeciesResponse> => {
  return rawCallStarwarsApi<SpeciesResponse>(uri);
};

export interface SpeciesResponse {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export type SpeciesPageResponse = PaginationResponse<SpeciesResponse>;
