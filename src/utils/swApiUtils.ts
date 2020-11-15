import { notEmptyString } from "@/utils/arrayUtils";
import ValidationError from "./validationUtils";

export const getIdFromUri = (uri: string) => {
  let id: number;
  try {
    id = Number(uri.split("/").filter(notEmptyString).slice(-1)[0]);
  } catch (e) {
    console.error(`An error occured when trying to get id from uri: ${e}`);
    throw new Error("An unknown error occured");
  }

  return id;
};

export const validateId = (id: string | number) => {
  let valid = true;

  if (String(id) !== String(Number(id))) {
    valid = false;
  }

  if (!Number.isInteger(Number(id))) {
    valid = false;
  }

  if (!valid) {
    throw new ValidationError([
      { key: "id", errors: ["Value is not a valid id"] },
    ]);
  }
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
