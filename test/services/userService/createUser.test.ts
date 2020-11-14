import { createUser, CreateUserInput } from "@/services/user.service";
import { comparePasswordHash } from "@/utils/passwordUtils";
import { ValidationError } from "class-validator";

describe("createUser function", () => {
  it("creates user when data is valid", async () => {
    const email = "pezet@magenta.tld";
    const password = "bubblegumRoz";

    const userInput: CreateUserInput = {
      email,
      password,
    };

    const user = await createUser(userInput);

    expect(user.email).toEqual(email);

    const hashValid = await comparePasswordHash(password, user.password_digest);

    expect(hashValid).toEqual(true);
  });

  it("throws an error when email is invalid", async () => {
    const wrongInput: CreateUserInput = {
      email: "notAnEmail",
      password: "a valid password",
    };

    await expect(createUser(wrongInput)).rejects.toThrow(ValidationError);
  });

  it("throws an error when password is too short", async () => {
    const wrongInput: CreateUserInput = {
      email: "valid@email.tld",
      password: "1".repeat(3),
    };

    await expect(createUser(wrongInput)).rejects.toThrow(ValidationError);
  });
});
