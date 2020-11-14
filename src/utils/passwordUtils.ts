import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  return hash(password, 10);
};

export const comparePasswordHash = async (
  password: string,
  passwordDigest: string
): Promise<boolean> => {
  return compare(password, passwordDigest);
};
