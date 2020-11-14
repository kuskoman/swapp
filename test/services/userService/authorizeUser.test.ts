import { User } from "@/entities/user.entity";
import { authorizeUser, createUser } from "@/services/user.service";

describe("authorizeUser function", () => {
  const email = "dadadadadad@example.com";
  const validPassword = "moglemZostacTaksowkarzem";
  const errorMessage = "Invalid email or password";
  let userData: User;

  beforeAll(async () => {
    userData = await createUser({
      email,
      password: validPassword,
    });
  });

  it("creates returns user when email and password is valid", async () => {
    const user = await authorizeUser({ email, password: validPassword });

    expect(user).toEqual(userData);
  });

  it("throws an error when password is invalid", async () => {
    const invalidInput = {
      email,
      password: "invalidPassword",
    };

    await expect(authorizeUser(invalidInput)).rejects.toThrow(errorMessage);
  });

  it("throws an error when email is invalid", async () => {
    const invalidInput = {
      email: "123214323421354234525245234234234234@example.com",
      password: "reallyanypassword",
    };

    await expect(authorizeUser(invalidInput)).rejects.toThrow(errorMessage);
  });
});
