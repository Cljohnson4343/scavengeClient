import Hunt from "./hunt";
import { Item, Items, Player, Players, Team, Teams } from "../../models";
import ScavengeResource from "../scavengeResource";
import { addTestModel } from "../../testUtils";
import { BASE_PATH } from "../../config";

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
    startTime: new Date(new Date().getTime() + hour).toISOString(),
    endTime: new Date(new Date().getTime() + hour * 3).toISOString(),
    items: [i[0], i[1]],
    creatorID: 32,
    latitude: 43.43,
    longitude: 23.23,
    locationName: "locale",
    createdAt: 21,
    huntID: 2,
    players: [ps.dan, ps.pat],
    teams: [afc.fins, afc.pats]
  },
  xmas: {
    huntName: "xmas hunt",
    maxTeams: 3,
    startTime: new Date(new Date().getTime() + 2 * hour),
    endTime: new Date(new Date().getTime() + hour * 6),
    items: [i[3], i[2]],
    players: [ps.tom, ps.wes],
    creatorID: 32,
    createdAt: 21,
    latitude: 43.43,
    longitude: 23.23,
    locationName: "locale",
    huntID: 2,
    teams: [afc.fins, afc.jets]
  },
  bball: {
    huntName: "bball hunt",
    maxTeams: 8,
    startTime: new Date(new Date().getTime() + 11 * hour),
    endTime: new Date(new Date().getTime() + hour * 19),
    items: [i[3], i[2]],
    players: [ps.tom, ps.wes],
    creatorID: 32,
    createdAt: 21,
    latitude: 43.43,
    longitude: 23.23,
    locationName: "locale",
    huntID: 2,
    teams: [afc.pats, afc.bills]
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
        expected: undefined
      },
      {
        name: "valid value",
        args: hs.football,
        expected: hs.football.huntName
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.name;

        expect(result).toStrictEqual(c.expected);
      });
    }
  });

  describe("starts", () => {
    const cases = [
      {
        name: "valid value",
        args: hs.football,
        expected: new Date(hs.football.startTime).getTime()
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.starts.getTime();

        expect(result).toStrictEqual(c.expected);
      });
    }
  });

  describe("ends", () => {
    const cases = [
      {
        name: "valid value",
        args: hs.football,
        expected: new Date(hs.football.endTime).getTime()
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.ends.getTime();

        expect(result).toStrictEqual(c.expected);
      });
    }
  });

  describe("maxTeams", () => {
    const cases = [
      {
        name: "default case",
        args: null,
        expected: undefined
      },
      {
        name: "valid value",
        args: hs.football,
        expected: hs.football.maxTeams
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.maxTeams;

        expect(result).toStrictEqual(c.expected);
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
        expected: hs.football.teams.length
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.numTeams;

        expect(result).toStrictEqual(c.expected);
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
          startTime: new Date(new Date().getTime() - hour).toISOString(),
          endTime: new Date(new Date().getTime() + hour).toISOString()
        }),
        expected: true
      },
      {
        name: "ended an hour ago",
        args: Object.assign({}, hs.football, {
          startTime: new Date(new Date().getTime() - 2 * hour).toISOString(),
          endTime: new Date(new Date().getTime() - 1 * hour).toISOString()
        }),
        expected: false
      },
      {
        name: "starts in an hour",
        args: Object.assign({}, hs.xmas, {
          startTime: new Date(new Date().getTime() + hour).toISOString()
        }),
        expected: false
      },
      {
        name: "hunt value that has already ended",
        args: Object.assign({}, hs.xmas, {
          startTime: new Date(new Date().getTime() - 3 * hour).toISOString(),
          endTime: new Date(new Date().getTime() - 2 * hour).toISOString()
        }),
        expected: false
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const hunt = new Hunt(c.args);

        const result = hunt.inProgress;

        expect(typeof result === "boolean").toBeTruthy();
        expect(result).toStrictEqual(c.expected);
      });
    }
  });

  describe("apiRetrieveHunt", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Hunt({ huntID: 43 })),
        expected: {
          url: BASE_PATH + "/hunts/43",
          method: "GET"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrieveHunt"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
      });
    }
  });

  describe("apiCreateHunt", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Hunt(hs.football)),
        expected: {
          url: BASE_PATH + "/hunts/",
          method: "POST"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiCreateHunt"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).toInclude("startTime");
        expect(result.data).toInclude("endTime");
        expect(result.data).toInclude("maxTeams");
        expect(result.data).toInclude("huntName");

        expect(result.data).not.toInclude("huntID");
        expect(result.data).not.toInclude("createdAt");
        expect(result.data).not.toInclude("creatorID");
      });
    }
  });

  describe("apiDeleteHunt", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Hunt({ huntID: 43 })),
        expected: {
          url: BASE_PATH + "/hunts/43",
          method: "DELETE"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiDeleteHunt"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });

  describe("apiUpdateHunt", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Hunt({ huntID: 43 })),
        expected: {
          url: BASE_PATH + "/hunts/43",
          method: "PATCH"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiUpdateHunt"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).not.toInclude("huntID");
        expect(result.data).not.toInclude("createdAt");
        expect(result.data).not.toInclude("creatorID");
      });
    }
  });
});
