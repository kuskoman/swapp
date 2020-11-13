import { generateToken, getUserIdFromToken } from "@/auth/sessions";

describe("Auth Token", () => {
  it("decodes encoded token", async () => {
    const userId = "someuser";
    const token = await generateToken(userId);
    const decodedToken = getUserIdFromToken(token);

    expect(decodedToken).toEqual(decodedToken);
  });
});
