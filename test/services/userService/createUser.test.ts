import { createUser, UserAuthInput } from "@/services/user.service";
import { comparePasswordHash } from "@/utils/passwordUtils";
import { ValidationError } from "@/utils/validationUtils";

describe("createUser function", () => {
  it("creates user when data is valid", async () => {
    const email = "pezet@magenta.tld";
    const password = "bubblegumRoz";

    const userInput: UserAuthInput = {
      email,
      password,
    };

    const user = await createUser(userInput);

    expect(user.email).toEqual(email);

    const hashValid = await comparePasswordHash(password, user.password_digest);

    expect(hashValid).toEqual(true);
  });

  it("throws an error when email is invalid", async () => {
    const wrongInput: UserAuthInput = {
      email: "notAnEmail",
      password: "a valid password",
    };

    await expect(createUser(wrongInput)).rejects.toThrow(ValidationError);
  });

  it("throws an error when password is too short", async () => {
    const wrongInput: UserAuthInput = {
      email: "valid@email.tld",
      password: "1".repeat(3),
    };

    await expect(createUser(wrongInput)).rejects.toThrow(ValidationError);
  });

  it("throws an error when email already exists", async () => {
    const doubledData: UserAuthInput = {
      email: "exists@example.tld",
      password: "validPassword",
    };

    await createUser(doubledData);
    await expect(createUser(doubledData)).rejects.toThrow(ValidationError);
  });
});
