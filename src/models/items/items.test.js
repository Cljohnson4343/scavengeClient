/* eslint-disable no-loop-func */
import Items from "./items";
import Item from "../item";
import ScavengeResource from "../scavengeResource";
import { BASE_PATH } from "../../config";
import { addTestModel } from "../../testUtils";

const i = [
  new Item("santa clause", 1),
  new Item("Mrs. Clause", 5),
  new Item("reindeer", 5),
  new Item("snow globe", 15)
];

describe("items", () => {
  describe("consrtuctor", () => {
    const cases = [
      {
        name: "null arg",
        args: null
      },
      {
        name: "valid array",
        args: [i[0], i[1]]
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const result = new Items(c.args);

        expect(result).toBeInstanceOf(Items);
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
        args: [i[0], i[1]],
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const items = new Items(c.args);
        const result = items.length;

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
        args: [i[0], i[1]]
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const items = new Items(c.args);
        const result = items.array;

        expect(result).toBeInstanceOf(Array);
      });
    }
  });

  describe("add", () => {
    const cases = [
      {
        name: "default case",
        args: null,
        input: i[0],
        expected: 1
      },
      {
        name: "to non-empty items",
        args: [i[0], i[1]],
        input: i[2],
        expected: 3
      },
      {
        name: "try to add duplicate",
        args: [i[0]],
        input: i[0],
        expected: 1
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const items = new Items(c.args);

        const result = items.add(c.input);

        expect(result).toBeInstanceOf(Items);
        expect(result.length).toBe(c.expected);
      });
    }
  });

  describe("remove", () => {
    const cases = [
      {
        name: "non-valid item",
        args: [i[0]],
        input: "fins",
        expected: 1
      },
      {
        name: "valid item",
        args: [i[0]],
        input: i[0],
        expected: 0
      },
      {
        name: "valid item that is not a member",
        args: [i[3], i[2]],
        input: i[0],
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const items = new Items(c.args);
        const result = items.remove(c.input);

        expect(result).toBeInstanceOf(Items);
        expect(result.length).toBe(c.expected);
        expect(Boolean(result.getByItem(c.input))).toBeFalsy();
      });
    }
  });

  describe("changeItemName", () => {
    const cases = [
      {
        name: "valid old name and new name",
        args: [i[0], i[3]],
        input: i[3],
        newName: i[2].name
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const items = new Items(c.args);

        const result = items.changeItemName(c.input, c.newName);
        expect(result).toBeInstanceOf(Items);

        expect(Boolean(result.getByName(c.input.name))).toBeFalsy();
        expect(Boolean(result.getByName(c.newName))).toBeTruthy();
      });
    }
  });

  describe("changeItemPoints", () => {
    const cases = [
      {
        name: "default items",
        args: [i[0], i[1]],
        input: i[1],
        points: i[0].points
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const items = new Items(c.args);

        const result = items.changeItemPoints(c.input, c.points);

        expect(result).toBeInstanceOf(Items);
        expect(result.getByName(c.input.name).points).toStrictEqual(c.points);
      });
    }
  });

  describe("getByName", () => {
    const cases = [
      {
        name: "member item",
        args: [i[0]],
        input: i[0].name,
        expected: true
      },
      {
        name: "non-member item",
        args: [i[0]],
        input: i[1].name,
        expected: false
      },
      {
        name: "invalid args",
        args: [i[1], i[0]],
        input: i[2],
        expected: false
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const items = new Items(c.args);

        const result = items.getByName(c.input);
        expect(Boolean(result)).toBe(c.expected);

        if (c.expected) {
          expect(result).toBeInstanceOf(Item);
          expect(result.name === c.input).toBeTruthy();
        }
      });
    }
  });

  describe("apiRetrieveItems", () => {
    const cases = [
      {
        name: "creates a valid url path",
        model: addTestModel(new Items([], 43)),
        data: {},
        expected: {
          url: BASE_PATH + "/hunts/43/items/",
          method: "GET"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrieveItems"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toBeDeepEqual(c.data);
      });
    }
  });
});
