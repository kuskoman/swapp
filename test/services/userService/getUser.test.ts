import { User } from "@/entities/user.entity";
import { createUser, getUser } from "@/services/user.service";

describe("getUser function", () => {
  let userData: User;

  beforeAll(async () => {
    userData = await createUser({
      email: "jakis@email.tld",
      password: "jakieshaslo",
    });
  });

  it("returns user for valid id", async () => {
    const user = await getUser(userData.id);

    expect(user).toStrictEqual(userData);
  });
});
