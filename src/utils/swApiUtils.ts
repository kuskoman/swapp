import { notEmptyString } from "@/utils/arrayUtils";
import { GraphQLError } from "graphql";

export const getIdFromUri = (uri: string) => {
  let id: number;
  try {
    id = Number(uri.split("/").filter(notEmptyString).slice(-1)[0]);
  } catch (e) {
    console.error(`An error occured when trying to get id from uri: ${e}`);
    throw new GraphQLError("An unknown error occured");
  }

  return id;
};

export type PaginationResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export interface BaseResponse {
  url: string;
}
