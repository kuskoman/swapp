import { compare, hash } from "bcryptjs";
import ValidationError from "./validationUtils";

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, 10);
};

export const comparePasswordHash = async (
  password: string,
  passwordDigest: string
): Promise<boolean> => {
  return compare(password, passwordDigest);
};

export const validatePassword = (password: string): void => {
  if (password.length < 7) {
    throw new ValidationError([{ key: "passport", errors: ["Too short"] }]);
  }
};
