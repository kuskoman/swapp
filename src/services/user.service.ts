import { User } from "@/entities/user.entity";
import getConnection from "@/orm";
import { hashPassword } from "@/utils/passwordUtils";
import { validateClassObject } from "@/utils/validationUtils";

export const createUser = async ({
  email,
  password,
}: CreateUserInput): Promise<User> => {
  const passwordDigest = await hashPassword(password);

  const user = new User();
  user.email = email;
  user.password_digest = passwordDigest;
  user.hero_id = 4; // random number choosen by a dick roll. TODO: change later

  await validateClassObject(user);

  const connection = await getConnection();
  return connection.getRepository(User).save(user);
};

export interface CreateUserInput {
  email: string;
  password: string;
}
