import { randomBytes } from "crypto";

export const randomBase64 = (length: number): string => {
  return randomBytes(length).toString("base64");
};

export const randomBase64Url = (length: number): string => {
  const baseString = randomBase64(length);
  return baseString.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
};
