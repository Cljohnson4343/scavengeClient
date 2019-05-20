import Media from "./media";
import Location from "../location";
import ScavengeResource from "../scavengeResource";
import { BASE_PATH } from "../../config";
import { addTestModel } from "../../testUtils";

describe("media", () => {
  const testData = {
    itemID: 43,
    location: new Location(),
    mediaID: 21,
    teamID: 32,
    url: "scavenge.io"
  };

  describe("constructor", () => {
    const cases = [
      {
        name: "constructs media with default args",
        args: null
      },
      {
        name: "constructs media with data object",
        args: testData
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = new Media(c.args);

        expect(result).toBeInstanceOf(Media);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);
      });
    }
  });

  describe("copy", () => {
    const cases = [
      {
        name: "copies a default media",
        model: new Media()
      },
      {
        name: "constructs media with data object",
        model: new Media(testData)
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = c.model.copy();

        expect(result).toBeInstanceOf(Media);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);

        expect(result).toBeDeepEqual(c.model);
      });
    }
  });

  describe("equals", () => {
    const cases = [
      {
        name: "two default medias should be equal",
        expect: expect(new Media()).not.toBeDeepEqual.bind(null, new Media())
      },
      {
        name: "two medias constructed with same data should be equal",
        expect: expect(new Media(testData)).not.toBeDeepEqual.bind(
          null,
          new Media(testData)
        )
      },
      {
        name: "a default media should not equal a media instantiated with data",
        expect: expect(new Media()).not.toBeDeepEqual.bind(
          null,
          new Media(testData)
        )
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.expect();
      });
    }
  });

  describe("apiCreateMedia", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Media(testData)),
        expected: {
          url: BASE_PATH + `/teams/${testData.teamID}/media/`,
          method: "POST"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiCreateMedia"](c.data);

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).toInclude("teamID");
        expect(result.data).toInclude("location");
        expect(result.data).toInclude("url");

        expect(result.data).not.toInclude("mediaID");
      });
    }
  });

  describe("apiDeleteMedia", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Media(testData)),
        expected: {
          url:
            BASE_PATH + `/teams/${testData.teamID}/media/${testData.mediaID}`,
          method: "DELETE"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiDeleteMedia"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
