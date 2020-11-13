import { getUserId } from "@/auth/authorizeApiRequest";
import { generateToken } from "@/auth/sessions";

const validUserId = "validUser";
let validToken: string,
  validRequestMock: RequestMock,
  validRequestMockWithBearerKeyword: RequestMock,
  invalidRequestMock: RequestMock;

beforeAll(async () => {
  validToken = await generateToken(validUserId);

  validRequestMock = {
    headers: {
      authorization: validToken,
    },
  };

  validRequestMockWithBearerKeyword = {
    headers: {
      authorization: "Bearer " + validToken,
    },
  };

  invalidRequestMock = {
    headers: {
      authorization: "session:afafaffafafafafaa.aggagagaga.ajjajaja",
    },
  };
});

describe("API Request Authorization", () => {
  describe("when request is valid", () => {
    it("returns user id", async () => {
      const userId = await getUserId(validRequestMock);

      expect(userId).toEqual(validUserId);
    });
  });

  describe("when request is valid and contains bearer keyword", () => {
    it("returns user id", async () => {
      const userId = await getUserId(validRequestMockWithBearerKeyword);

      expect(userId).toEqual(validUserId);
    });
  });

  describe("when request is invalid", () => {
    it("returns error", async () => {
      await expect(getUserId(invalidRequestMock)).rejects.toThrowError(
        "Invalid session key"
      );
    });
  });

  describe("session namespacing", () => {
    it("disallows accessing different key value than session", async () => {
      const header = {
        headers: {
          authorization: "1",
        },
      };

      await expect(getUserId(header)).rejects.toThrowError(
        "Invalid session key"
      );
    });
  });
});

interface RequestMock {
  headers: { authorization?: string };
}
