import { User } from "@/entities/user.entity";
import { getUser } from "@/services/user.service";
import { UserID } from "@/types";

export const convertToUser = async (
  userInput: UserID | User
): Promise<User> => {
  if (typeof userInput !== "object") {
    const user = await getUser(userInput);
    return user as User;
  }

  return userInput;
};
