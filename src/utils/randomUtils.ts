import { randomBytes } from "crypto";

export const randomBase64 = (length: number): string => {
  return randomBytes(length).toString("base64");
};

export const randomBase64Url = (length: number): string => {
  const baseString = randomBase64(length);
  const urlEncodedString = normalizeBase64ToUrl(baseString);

  return urlEncodedString;
};

export const normalizeBase64ToUrl = (b64String: string): string => {
  return b64String.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
};

export const randomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};
