import { User } from "@/entities/user.entity";
import getConnection from "@/orm";
import { UserID } from "@/types";
import {
  comparePasswordHash,
  hashPassword,
  validatePassword,
} from "@/utils/passwordUtils";
import ValidationError, { validateClassObject } from "@/utils/validationUtils";
import { getRandomHero } from "./hero.service";

export const createUser = async ({
  email,
  password,
}: UserAuthInput): Promise<User> => {
  validatePassword(password);
  await checkUserUniqueness(email);
  const passwordDigest = await hashPassword(password);
  const randomHero = await getRandomHero();

  const user = new User();
  user.email = email;
  user.password_digest = passwordDigest;
  user.hero_uri = randomHero.url;

  await validateClassObject(user);

  const repository = await getRepository();
  return repository.save(user);
};

export const authorizeUser = async ({
  email,
  password,
}: UserAuthInput): Promise<User> => {
  const repository = await getRepository();
  const user = await repository.findOne({ email });
  const errorMessage = "Invalid email or password";

  if (!user) {
    throw new Error(errorMessage); // we do not want to allow checking if email exist in our db
  }

  const passwordValid = await comparePasswordHash(
    password,
    user.password_digest
  );

  if (!passwordValid) {
    throw new Error(errorMessage);
  }

  return user;
};

export const getUser = async (id: UserID) => {
  const repository = await getRepository();
  return repository.findOne(id);
};

const checkUserUniqueness = async (email: string) => {
  const repository = await getRepository();
  const exists = await repository.findOne({ email });
  if (exists) {
    throw new ValidationError([
      { key: "email", errors: ["User with this email already exists"] },
    ]);
  }
};

const getRepository = async () => {
  const connection = await getConnection();
  return connection.getRepository(User);
};
export interface UserAuthInput {
  email: string;
  password: string;
}
