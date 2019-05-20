/* eslint-disable no-loop-func */
import Location from "../location";
import Medias from "./medias";
import Media from "../media";
import ScavengeResource from "../scavengeResource";
import { addTestModel } from "../../testUtils";
import { BASE_PATH } from "../../config";
const testData = {
  itemID: 43,
  location: new Location(),
  mediaID: 21,
  teamID: 32,
  url: "scavenge.io"
};

const l = [
  new Media(testData),
  new Media(Object.assign({}, testData, { mediaID: 2 })),
  new Media(Object.assign({}, testData, { mediaID: 3 })),
  new Media(Object.assign({}, testData, { mediaID: 223 })),
  new Media(Object.assign({}, testData, { mediaID: 2323 }))
];

describe("Medias", () => {
  describe("consrtuctor", () => {
    const cases = [
      {
        name: "null arg",
        args: null
      },
      {
        name: "valid array",
        args: [l[0], l[1]]
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const result = new Medias(c.args);

        expect(result).toBeInstanceOf(Medias);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);
      });
    }
  });

  describe("length", () => {
    const cases = [
      {
        name: "null arg",
        args: null,
        expected: 0
      },
      {
        name: "valid array",
        args: [l[0], l[1]],
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const medias = new Medias(c.args);
        const result = medias.length;

        expect(typeof result === "number").toBeTruthy();
        expect(result).toBe(c.expected);
      });
    }
  });

  describe("array", () => {
    const cases = [
      {
        name: "null constructor",
        args: null
      },
      {
        name: "valid array args",
        args: [l[0], l[1]]
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const medias = new Medias(c.args);
        const result = medias.array;

        expect(result).toBeInstanceOf(Array);
      });
    }
  });

  describe("add", () => {
    const cases = [
      {
        name: "default case",
        args: null,
        input: l[0],
        expected: 1
      },
      {
        name: "to non-empty medias",
        args: [l[0], l[1]],
        input: l[2],
        expected: 3
      },
      {
        name: "try to add duplicate",
        args: [l[0]],
        input: l[0],
        expected: 1
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const medias = new Medias(c.args);

        const result = medias.add(c.input);

        expect(result).toBeInstanceOf(Medias);
        expect(result.length).toBe(c.expected);
      });
    }
  });

  describe("remove", () => {
    const cases = [
      {
        name: "non-valid media",
        args: [l[0]],
        input: "fins",
        id: "",
        expected: 1
      },
      {
        name: "valid media",
        args: [l[0]],
        input: l[0],
        id: l[0].mediaID,
        expected: 0
      },
      {
        name: "valid media that is not a member",
        args: [l[3], l[2]],
        input: l[0],
        id: l[0].mediaID,
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const medias = new Medias(c.args);
        const result = medias.remove(c.input);

        expect(result).toBeInstanceOf(Medias);
        expect(result.length).toBe(c.expected);
        expect(Boolean(result.getByID(c.id))).toBeFalsy();
      });
    }
  });

  describe("apiRetrieveMedia", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Medias(testData, 43)),
        expected: {
          url: BASE_PATH + `/teams/43/media/`,
          method: "GET"
        },
        data: { test: "data" }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrieveMedia"](c.data);

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
