import Item from "./item";
import deepFreeze from "deep-freeze";

describe("Item", () => {
  describe("constructor", () => {
    const cases = [
      {
        label: "default case",
        name: null,
        points: null
      },
      {
        label: "with values",
        name: "item name",
        points: 43
      }
    ];

    for (let c of cases) {
      test(c.label, () => {
        const result = new Item(c.name, c.points);

        expect(result).toBeInstanceOf(Item);
      });
    }
  });

  describe("name", () => {
    const cases = [
      {
        label: "default case",
        name: null,
        points: null,
        expected: ""
      },
      {
        label: "with values",
        name: "item name",
        points: 43,
        expected: "item name"
      }
    ];

    for (let c of cases) {
      test(c.label, () => {
        const item = new Item(c.name, c.points);
        deepFreeze(item);

        const result = item.name;
        expect(result).toBe(c.expected);
      });
    }
  });

  describe("points", () => {
    const cases = [
      {
        label: "default case",
        name: null,
        points: null,
        expected: 1
      },
      {
        label: "with values",
        name: "item name",
        points: 43,
        expected: 43
      },
      {
        label: "with real value",
        name: "item name",
        points: 43.43,
        expected: 43
      }
    ];

    for (let c of cases) {
      test(c.label, () => {
        const item = new Item(c.name, c.points);
        deepFreeze(item);

        const result = item.points;
        expect(result).toBe(c.expected);
      });
    }
  });

  describe("changeName", () => {
    const cases = [
      {
        label: "default case",
        name: null,
        newName: "updated",
        points: null,
        expected: "updated"
      },
      {
        label: "with valid new name",
        name: "item name",
        newName: "updated",
        points: 43,
        expected: "updated"
      },
      {
        label: "with invalid new name value",
        name: "item name",
        newName: null,
        points: 43,
        expected: "item name"
      }
    ];

    for (let c of cases) {
      test(c.label, () => {
        const item = new Item(c.name, c.points);
        deepFreeze(item);

        const result = item.changeName(c.newName);
        expect(result).toBeInstanceOf(Item);
        expect(result.name).toStrictEqual(c.expected);
      });
    }
  });

  describe("changePoints", () => {
    const cases = [
      {
        label: "default case",
        name: null,
        newPoints: 23,
        points: null,
        expected: 23
      },
      {
        label: "with real number value",
        name: "item name",
        newPoints: 23.23,
        points: 43,
        expected: 23
      },
      {
        label: "with zero value",
        name: "item name",
        newPoints: 0,
        points: 43,
        expected: 1
      },
      {
        label: "with negative value real value",
        name: "item name",
        newPoints: -1,
        points: 43,
        expected: 1
      }
    ];

    for (let c of cases) {
      test(c.label, () => {
        const item = new Item(c.name, c.points);
        deepFreeze(item);

        const result = item.changePoints(c.newPoints);
        expect(result).toBeInstanceOf(Item);
        expect(result.points).toStrictEqual(c.expected);
      });
    }
  });

  describe("equals", () => {
    const cases = [
      {
        label: "default case",
        name: null,
        points: null,
        item: new Item(null, null),
        expected: true
      },
      {
        label: "different name same points",
        name: "name",
        points: 43,
        item: new Item("different", 43),
        expected: false
      },
      {
        label: "same item",
        name: "same",
        points: 43,
        item: new Item("same", 43),
        expected: true
      }
    ];

    for (let c of cases) {
      test(c.label, () => {
        const item = new Item(c.name, c.points);
        deepFreeze(item);

        const result = item.equals(c.item);
        expect(result).toBe(c.expected);
      });
    }
  });

  describe("copy", () => {
    const cases = [
      {
        label: "default case",
        name: null,
        points: null,
        expected: new Item(null, null)
      },
      {
        label: "real value",
        name: "name",
        points: 43,
        expected: new Item("name", 43)
      }
    ];

    for (let c of cases) {
      test(c.label, () => {
        const item = new Item(c.name, c.points);
        deepFreeze(item);

        const result = item.copy();
        expect(result.equals(c.expected)).toBeTruthy();
      });
    }
  });
});
