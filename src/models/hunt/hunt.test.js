import Hunt from "./hunt";
import { Item, Items, Player, Players, Team, Teams } from "../../models";
import ScavengeResource from "../scavengeResource";

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
  football: {
    huntName: "football hunt",
    maxTeams: 4,
    startDate: new Date(new Date().getTime() + hour),
    endDate: new Date(new Date().getTime() + hour * 3),
    items: new Items([i[0], i[1]]),
    players: new Players([ps.dan, ps.pat]),
    teams: new Teams([afc.fins, afc.pats])
  },
  xmas: {
    huntName: "xmas hunt",
    maxTeams: 3,
    startDate: new Date(new Date().getTime() + 2 * hour),
    endDate: new Date(new Date().getTime() + hour * 6),
    items: new Items([i[3], i[2]]),
    players: new Players([ps.tom, ps.wes]),
    teams: new Teams([afc.fins, afc.jets])
  },
  bball: {
    huntName: "bball hunt",
    maxTeams: 8,
    startDate: new Date(new Date().getTime() + 11 * hour),
    endDate: new Date(new Date().getTime() + hour * 19),
    items: new Items([i[3], i[2]]),
    players: new Players([ps.tom, ps.wes]),
    teams: new Teams([afc.pats, afc.bills])
  }
};

describe("hunt", () => {
  describe("constructor", () => {
    const cases = [
      {
        name: "default case",
        args: null
      },
      {
        name: "valid value",
        args: hs.football
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas)
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = new Hunt(c.args);

        expect(result).toBeInstanceOf(Hunt);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.path).toStrictEqual("/hunts");
      });
    }
  });

  describe("name", () => {
    const cases = [
      {
        name: "default case",
        args: null,
        expected: ""
      },
      {
        name: "valid value",
        args: hs.football,
        expected: hs.football.huntName
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas),
        expected: hs.xmas.huntName
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.name;

        expect(typeof result === "string").toBeTruthy();
        expect(result).toStrictEqual(c.expected);
      });
    }
  });

  describe("starts", () => {
    const cases = [
      {
        name: "default case",
        args: null
      },
      {
        name: "valid value",
        args: hs.football,
        expected: hs.football.startDate
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas),
        expected: hs.xmas.startDate
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.starts;

        expect(result instanceof Date).toBeTruthy();
        if (c.expected) {
          expect(result.getTime()).toStrictEqual(c.expected.getTime());
        }
      });
    }
  });

  describe("ends", () => {
    const cases = [
      {
        name: "default case",
        args: null
      },
      {
        name: "valid value",
        args: hs.football,
        expected: hs.football.endDate
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas),
        expected: hs.xmas.endDate
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.ends;

        expect(result instanceof Date).toBeTruthy();
        if (c.expected) {
          expect(result.getTime()).toStrictEqual(c.expected.getTime());
        }
      });
    }
  });

  describe("maxTeams", () => {
    const cases = [
      {
        name: "default case",
        args: null
      },
      {
        name: "valid value",
        args: hs.football,
        expected: hs.football.maxTeams
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas),
        expected: hs.xmas.maxTeams
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.maxTeams;

        expect(typeof result === "number").toBeTruthy();
        if (c.expected) {
          expect(result).toStrictEqual(c.expected);
        }
      });
    }
  });

  describe("numTeams", () => {
    const cases = [
      {
        name: "default case",
        args: null,
        expected: 0
      },
      {
        name: "valid value",
        args: hs.football,
        expected: hs.football.teams.array.length
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas),
        expected: hs.xmas.teams.array.length
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.numTeams;

        expect(typeof result === "number").toBeTruthy();
        if (c.expected) {
          expect(result).toStrictEqual(c.expected);
        }
      });
    }
  });

  describe("items", () => {
    const cases = [
      {
        name: "default case",
        args: null
      },
      {
        name: "valid value",
        args: hs.football
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas)
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.items;

        expect(result instanceof Items).toBeTruthy();
      });
    }
  });

  describe("teams", () => {
    const cases = [
      {
        name: "default case",
        args: null
      },
      {
        name: "valid value",
        args: hs.football
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas)
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.teams;

        expect(result instanceof Teams).toBeTruthy();
      });
    }
  });

  describe("players", () => {
    const cases = [
      {
        name: "default case",
        args: null
      },
      {
        name: "valid value",
        args: hs.football
      },
      {
        name: "hunt value",
        args: new Hunt(hs.xmas)
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.players;

        expect(result instanceof Players).toBeTruthy();
      });
    }
  });

  describe("inProgress", () => {
    const cases = [
      {
        name: "started an hour ago",
        args: Object.assign({}, hs.football, {
          startDate: new Date(new Date().getTime() - hour)
        }),
        expected: true
      },
      {
        name: "ended an hour ago",
        args: Object.assign({}, hs.football, {
          startDate: new Date(new Date().getTime() - 2 * hour),
          endDate: new Date(new Date().getTime() - 1 * hour)
        }),
        expected: false
      },
      {
        name: "starts in an hour",
        args: new Hunt(
          Object.assign({}, hs.xmas, {
            startDate: new Date(new Date().getTime() + hour)
          })
        ),
        expected: false
      },
      {
        name: "hunt value that has already ended",
        args: new Hunt(
          Object.assign({}, hs.xmas, {
            startDate: new Date(new Date().getTime() - hour),
            endDate: new Date(new Date().getTime() - 2 * hour)
          })
        ),
        expected: false
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.inProgess;

        expect(typeof result === "boolean").toBeTruthy();
        expect(result).toStrictEqual(c.expected);
      });
    }
  });
});
