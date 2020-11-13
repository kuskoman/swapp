import { helloWorld } from "@/index";

describe("test", () => {
  it("works", () => {
    expect(helloWorld()).toBe("buenos dias buenos aires");
  });
});
