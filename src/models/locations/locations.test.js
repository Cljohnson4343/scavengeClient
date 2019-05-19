/* eslint-disable no-loop-func */
import Locations from "./locations";
import Location from "../location";
import ScavengeResource from "../scavengeResource";
import { addTestModel } from "../../testUtils";
import { BASE_PATH } from "../../config";
import deepFreeze from "deep-freeze";

const testData = {
  teamID: 43,
  locationID: 23,
  latitude: 43.43,
  longitude: 43.43,
  timestamp: new Date()
};

const l = [
  new Location(testData),
  new Location(Object.assign({}, testData, { locationID: 2 })),
  new Location(Object.assign({}, testData, { locationID: 3 })),
  new Location(Object.assign({}, testData, { locationID: 223 })),
  new Location(Object.assign({}, testData, { locationID: 2323 }))
];

describe("Locations", () => {
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
        const result = new Locations(c.args);

        expect(result).toBeInstanceOf(Locations);
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
        const locations = new Locations(c.args);
        const result = locations.length;

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
        const locations = new Locations(c.args);
        const result = locations.array;

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
        name: "to non-empty locations",
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
        const locations = new Locations(c.args);
        deepFreeze(locations);

        const result = locations.add(c.input);

        expect(result).toBeInstanceOf(Locations);
        expect(result.length).toBe(c.expected);
      });
    }
  });

  describe("remove", () => {
    const cases = [
      {
        name: "non-valid location",
        args: [l[0]],
        input: "fins",
        id: "",
        expected: 1
      },
      {
        name: "valid location",
        args: [l[0]],
        input: l[0],
        id: l[0].locationID,
        expected: 0
      },
      {
        name: "valid location that is not a member",
        args: [l[3], l[2]],
        input: l[0],
        id: l[0].locationID,
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const locations = new Locations(c.args);
        deepFreeze(locations);
        const result = locations.remove(c.input);

        expect(result).toBeInstanceOf(Locations);
        expect(result.length).toBe(c.expected);
        expect(Boolean(result.getByID(c.id))).toBeFalsy();
      });
    }
  });

  describe("apiRetrieveLocations", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Locations(testData, 43)),
        expected: {
          url: BASE_PATH + `/teams/43/locations/`,
          method: "GET"
        },
        data: { test: "data" }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrieveLocations"](c.data);

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
