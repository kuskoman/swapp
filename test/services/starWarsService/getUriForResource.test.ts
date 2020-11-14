import { getUriForResource } from "@/services/starWars.service";

describe("getUriForResource function", () => {
  it("properly creates uri for resources", () => {
    const uri = getUriForResource;

    const resource1a = "people/8/";
    const resource1b = "people/8";
    const uri1 = "https://swapi.dev/api/people/8/";

    const uriForResource1a = uri(resource1a);
    const uriForResource1b = uri(resource1b);

    expect(uriForResource1a).toBe(uri1);
    expect(uriForResource1b).toBe(uri1);

    const resource2a = "planets/?page=2";
    const resource2b = "/planets/?page=2/";
    const uri2 = "https://swapi.dev/api/planets/?page=2";

    const uriForResource2a = uri(resource2a);
    const uriForResource2b = uri(resource2b);

    expect(uriForResource2a).toBe(uri2);
    expect(uriForResource2b).toBe(uri2);
  });
});
