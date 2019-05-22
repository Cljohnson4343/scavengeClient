/* eslint-disable no-loop-func */
import ScavengeResource from "../scavengeResource";
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
import { BASE_PATH } from "../../config";
import { addTestModel } from "../../testUtils";

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
    startTime: new Date(new Date().getTime() + hour),
    endTime: new Date(new Date().getTime() + hour * 3),
    items: new Items([i.santa, i.helmet]),
    players: new Players([ps.dan, ps.pat]),
    teams: new Teams([afc.fins, afc.pats])
  }),
  xmas: new Hunt({
    huntName: "xmas hunt",
    maxTeams: 3,
    startTime: new Date(new Date().getTime() + 2 * hour),
    endTime: new Date(new Date().getTime() + hour * 6),
    items: new Items([i.tree, i.star]),
    players: new Players([ps.tom, ps.wes]),
    teams: new Teams([afc.fins, afc.jets])
  }),
  bball: new Hunt({
    huntName: "bball hunt",
    maxTeams: 8,
    startTime: new Date(new Date().getTime() + 11 * hour),
    endTime: new Date(new Date().getTime() + hour * 19),
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
        input: hs.xmas,
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
        const result = hunts.remove(c.input);

        expect(result).toBeInstanceOf(Hunts);
        expect(result.length).toBe(c.expected);
      });
    }
  });

  describe("apiRetrieveHunts", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Hunts([])),
        expected: {
          url: BASE_PATH + "/hunts/",
          method: "GET"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrieveHunts"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
