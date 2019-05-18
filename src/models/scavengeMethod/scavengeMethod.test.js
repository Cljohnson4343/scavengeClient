import ScavengeMethod from "./scavengeMethod";

describe("scavengeMethod", () => {
  test("should return function", () => {
    const result = ScavengeMethod({});

    expect(typeof result === "function").toBeTruthy();
  });
});
