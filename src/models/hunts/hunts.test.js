/* eslint-disable no-loop-func */
/*import deepFreeze from "deep-freeze";
import {
  Hunt,
  Hunts,
  Item,
  Items,
  Team,
  Teams,
  Player,
  Players
} from "../../models";

const afc = {
  fins: new Team("fins"),
  bills: new Team("bills"),
  pats: new Team("pats"),
  jets: new Team("jets")
};

const ps = {
  dan: new Player("danMarino@gmail.com", afc.fins),
  pat: new Player("patSurtain@gmailcom", afc.fins),
  tom: new Player("tomBrady@gmail.com", afc.pats),
  wes: new Player("wesWelker@gmailcom", afc.pats),
  jim: new Player("jimKelly@gmail.com", afc.bills),
  bruce: new Player("bruceSmith@gmailcom", afc.bills),
  vinny: new Player("vinnyT@gmailcom", afc.jets)
};

const i = {
  tree: new Item("tree", 5),
  star: new Item("star", 5),
  santa: new Item("santa", 10),
  grinch: new Item("grinch", 15),
  helmet: new Item("helmet", 1),
  cleat: new Item("cleat", 5)
};

const hour = 1000 * 60 * 60;
const hs = {
  football: new Hunt({
    huntName: "football hunt",
    maxTeams: 4,
    startDate: new Date(new Date().getTime() + hour),
    endDate: new Date(new Date().getTime() + hour * 3),
    items: new Items([i.santa, i.helmet]),
    players: new Players([ps.dan, ps.pat]),
    teams: new Teams([afc.fins, afc.pats])
  }),
  xmas: new Hunt({
    huntName: "xmas hunt",
    maxTeams: 3,
    startDate: new Date(new Date().getTime() + 2 * hour),
    endDate: new Date(new Date().getTime() + hour * 6),
    items: new Items([i.tree, i.star]),
    players: new Players([ps.tom, ps.wes]),
    teams: new Teams([afc.fins, afc.jets])
  }),
  bball: new Hunt({
    huntName: "bball hunt",
    maxTeams: 8,
    startDate: new Date(new Date().getTime() + 11 * hour),
    endDate: new Date(new Date().getTime() + hour * 19),
    items: new Items([i.grinch, i.cleat]),
    players: new Players([ps.tom, ps.wes]),
    teams: new Teams([afc.pats, afc.bills])
  })
};

describe("hunts", () => {
  describe("consrtuctor", () => {
    const cases = [
      {
        name: "null arg",
        args: null
      },
      {
        name: "valid array",
        args: [hs.bball, hs.football]
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const result = new Hunts(c.args);

        expect(result).toBeInstanceOf(Hunts);
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
        args: [hs.bball, hs.football],
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const hunts = new Hunts(c.args);
        const result = hunts.length;

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
        args: [hs.bball, hs.football]
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const hunts = new Hunts(c.args);
        const result = hunts.array;

        expect(result).toBeInstanceOf(Array);
      });
    }
  });

  describe("add", () => {
    const cases = [
      {
        name: "default case",
        args: null,
        input: hs.bball,
        expected: 1
      },
      {
        name: "to non-empty hunts",
        args: [hs.bball, hs.football],
        input: i[2],
        expected: 3
      },
      {
        name: "try to add duplicate",
        args: [hs.bball],
        input: hs.bball,
        expected: 1
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const hunts = new Hunts(c.args);
        deepFreeze(hunts);

        const result = hunts.add(c.input);

        expect(result).toBeInstanceOf(Hunts);
        expect(result.length).toBe(c.expected);
      });
    }
  });

  describe("remove", () => {
    const cases = [
      {
        name: "non-valid item",
        args: [hs.bball],
        input: "fins",
        expected: 1
      },
      {
        name: "valid item",
        args: [hs.bball],
        input: hs.bball,
        expected: 0
      },
      {
        name: "valid item that is not a member",
        args: [hs.xmas, hs.football],
        input: hs.bball,
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const hunts = new Hunts(c.args);
        deepFreeze(hunts);
        const result = hunts.remove(c.input);

        expect(result).toBeInstanceOf(Hunts);
        expect(result.length).toBe(c.expected);
        expect(Boolean(result.getByItem(c.input))).toBeFalsy();
      });
    }
  });

  describe("changeItemName", () => {
    const cases = [
      {
        name: "valid old name and new name",
        args: [hs.bball, hs.xmas],
        input: hs.xmas,
        newName: i[2].name
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const hunts = new Hunts(c.args);
        deepFreeze(hunts);

        const result = hunts.changeItemName(c.input, c.newName);
        expect(result).toBeInstanceOf(Hunts);

        expect(Boolean(result.getByName(c.input.name))).toBeFalsy();
        expect(Boolean(result.getByName(c.newName))).toBeTruthy();
      });
    }
  });

  describe("changeItemPoints", () => {
    const cases = [
      {
        name: "default hunts",
        args: [hs.bball, hs.football],
        input: hs.football,
        points: hs.bball.points
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const hunts = new Hunts(c.args);
        deepFreeze(hunts);

        const result = hunts.changeItemPoints(c.input, c.points);

        expect(result).toBeInstanceOf(Hunts);
        expect(result.getByName(c.input.name).points).toStrictEqual(c.points);
      });
    }
  });

  describe("getByName", () => {
    const cases = [
      {
        name: "member item",
        args: [hs.bball],
        input: hs.bball.name,
        expected: true
      },
      {
        name: "non-member item",
        args: [hs.bball],
        input: hs.football.name,
        expected: false
      },
      {
        name: "invalid args",
        args: [hs.football, hs.bball],
        input: i[2],
        expected: false
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const hunts = new Hunts(c.args);
        deepFreeze(hunts);

        const result = hunts.getByName(c.input);
        expect(Boolean(result)).toBe(c.expected);

        if (c.expected) {
          expect(result).toBeInstanceOf(Item);
          expect(result.name === c.input).toBeTruthy();
        }
      });
    }
  });
});
*/
