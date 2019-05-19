import Location from "./location";
import ScavengeResource from "../scavengeResource";
import { BASE_PATH } from "../../config";
import { addTestModel } from "../../testUtils";

describe("location", () => {
  const testData = {
    teamID: 43,
    locationID: 23,
    longitude: 43.43,
    timestamp: new Date()
  };

  describe("constructor", () => {
    const cases = [
      {
        name: "constructs location with default args",
        args: null
      },
      {
        name: "constructs location with data object",
        args: testData
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = new Location(c.args);

        expect(result).toBeInstanceOf(Location);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);
      });
    }
  });

  describe("copy", () => {
    const cases = [
      {
        name: "copies a default location",
        model: new Location()
      },
      {
        name: "constructs location with data object",
        model: new Location(testData)
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = c.model.copy();

        expect(result).toBeInstanceOf(Location);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);

        expect(result).toBeDeepEqual(c.model);
      });
    }
  });

  describe("equals", () => {
    const cases = [
      {
        name: "two default locations should be equal",
        expect: expect(new Location()).not.toBeDeepEqual.bind(
          null,
          new Location()
        )
      },
      {
        name: "two locations constructed with same data should be equal",
        expect: expect(new Location(testData)).not.toBeDeepEqual.bind(
          null,
          new Location(testData)
        )
      },
      {
        name:
          "a default location should not equal a location instantiated with data",
        expect: expect(new Location()).not.toBeDeepEqual.bind(
          null,
          new Location(testData)
        )
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.expect();
      });
    }
  });

  describe("apiCreateLocation", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Location(testData)),
        expected: {
          url: BASE_PATH + `/teams/${testData.teamID}/locations/`,
          method: "POST"
        },
        data: { test: "data" }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiCreateLocation"](c.data);

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
