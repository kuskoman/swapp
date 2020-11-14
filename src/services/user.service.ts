import { User } from "@/entities/user.entity";
import getConnection from "@/orm";
import { hashPassword, validatePassword } from "@/utils/passwordUtils";
import ValidationError, { validateClassObject } from "@/utils/validationUtils";

export const createUser = async ({
  email,
  password,
}: CreateUserInput): Promise<User> => {
  validatePassword(password);
  await checkUserUniqueness(email);
  const passwordDigest = await hashPassword(password);

  const user = new User();
  user.email = email;
  user.password_digest = passwordDigest;
  user.hero_id = 4; // random number choosen by a dick roll. TODO: change later

  await validateClassObject(user);

  const repository = await getRepository();
  return repository.save(user);
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
export interface CreateUserInput {
  email: string;
  password: string;
}
