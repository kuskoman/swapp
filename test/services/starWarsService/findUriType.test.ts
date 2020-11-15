import { findUriType } from "@/services/starWars.service";

describe("findUriType function", () => {
  it("properly finds uri type", () => {
    const singleUri = "http://swapi.dev/api/people/8/";
    const paginationUri = "http://swapi.dev/api/planets/?page=2";

    const singleUriType = findUriType(singleUri);
    const paginationUriType = findUriType(paginationUri);

    expect(singleUriType).toBe("single");
    expect(paginationUriType).toBe("pagination");
  });
});
