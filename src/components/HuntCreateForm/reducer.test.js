/* eslint-disable no-loop-func */
import deepFreeze from "deep-freeze";
import {
  endDate,
  huntName,
  items,
  maxTeams,
  players,
  startDate,
  teams
} from "./reducer";
import * as actions from "./actions";
import { Item, Items, Player, Team, Teams, Players } from "../../models";

const plrs = {
  dan: new Player("danMarino@gmail.com"),
  pat: new Player("patSurtain@gmailcom"),
  tom: new Player("tomBrady@gmail.com"),
  wes: new Player("wesWelker@gmailcom"),
  jim: new Player("jimKelly@gmail.com"),
  bruce: new Player("bruceSmith@gmailcom"),
  vinny: new Player("vinnyT@gmailcom")
};

describe("teams", () => {
  describe("action addTeam", () => {
    test("should add a team when state is empty", () => {
      const action = actions.addTeam("Dolphins");
      deepFreeze(action);
      let state = new Teams();
      deepFreeze(state);

      const result = teams(state, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBeGreaterThan(0);
    });
    test("should add team when state isn't empty", () => {
      const testState = new Teams([new Team("Bills")]);
      const action = actions.addTeam("Fins");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe("action removeTeam", () => {
    test("should remove a team", () => {
      const bills = new Team("Bills");
      const testState = new Teams([bills]);
      const action = actions.removeTeam(bills);
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBe(0);
    });
    test("should remove the correct team", () => {
      const pats = new Team("pats");
      const testState = new Teams([new Team("fins"), pats]);
      const action = actions.removeTeam(pats);
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("action changePlayersTeam", () => {
    test("should remove a player from team's player list", () => {
      let bills = new Team("bills");
      const testPlayer = new Player("cj@gmail.com", bills);
      bills = bills.addPlayer(testPlayer);

      const testState = new Teams([bills]);
      const action = actions.changePlayersTeam(testPlayer, new Team("fins"));
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBe(1);
    });
    test("should add a player to team's player list", () => {
      const fins = new Team("fins");
      const testPlayer = new Player("cj@gmail.com", fins);

      const testState = new Teams([fins]);
      const action = actions.changePlayersTeam(testPlayer, fins);
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBe(1);
      expect(result.getByTeam(fins).hasPlayer(testPlayer)).toBeTruthy();
    });
  });
});

describe("players", () => {
  describe("action addPlayer", () => {
    test("should add a player when state is empty", () => {
      const action = actions.addPlayer("cj@gmail.com");
      deepFreeze(action);
      let state = new Players();
      deepFreeze(state);

      const result = players(state, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBeGreaterThan(0);
      expect(result.getByEmail("cj@gmail.com")).toBeInstanceOf(Player);
    });
    test("should add player when state isn't empty", () => {
      const testState = new Players([new Player("cj@yahoo.com")]);
      const action = actions.addPlayer("cj@gmail.com");
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBeGreaterThan(1);
      expect(result.getByEmail("cj@gmail.com")).toBeInstanceOf(Player);
    });
  });

  describe("action removePlayer", () => {
    test("should remove a player", () => {
      const testState = new Players([new Player("cj@gmail.com")]);
      const action = actions.removePlayer("cj@gmail.com");
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBe(0);
    });
    test("should remove the correct team", () => {
      const testState = new Players([
        new Player("cj@gmail.com"),
        new Player("cj@yahoo.com")
      ]);
      const action = actions.removePlayer("cj@gmail.com");
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBeGreaterThan(0);
      expect(Boolean(result.getByEmail("cj@gmail.com"))).toBeFalsy();
    });
  });

  describe("action changePlayersTeam", () => {
    test("should update a player's team", () => {
      const fins = new Team("fins");
      const gmail = new Player("cj@gmail.com");

      const testState = new Players([gmail]);
      const action = actions.changePlayersTeam(gmail, fins);
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBe(1);
      expect(result.getByPlayer(gmail).team.equals(fins)).toBeTruthy();
    });
  });

  describe("action changePlayerEmail", () => {
    const cases = [
      {
        name: "valid player",
        args: [plrs.dan, plrs.jim],
        player: plrs.dan,
        email: "dan_the_man@greatest.com"
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const state = new Players(c.args);
        const action = actions.changePlayerEmail(c.player, c.email);
        deepFreeze(state);
        deepFreeze(action);

        const result = players(state, action);

        expect(result).toBeInstanceOf(Players);
        expect(Boolean(result.getByEmail(c.player.email))).toBeFalsy();
        expect(Boolean(result.getByEmail(c.email))).toBeTruthy();
      });
    }
  });
});

describe("items", () => {
  const i = [
    new Item("first", 5),
    new Item("second", 10),
    new Item("third", 15),
    new Item("fourth", 20)
  ];

  describe("action addItem", () => {
    const cases = [
      {
        name: "should add an item when state is empty",
        args: null,
        item: i[0],
        expected: 1
      },
      {
        name: "should add player when state isn't empty",
        args: [i[0], i[1]],
        item: i[2],
        expected: 3
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const action = actions.addItem(c.item);
        deepFreeze(action);
        let state = new Items(c.args);
        deepFreeze(state);

        const result = items(state, action);

        expect(result).toBeInstanceOf(Items);
        expect(result.length).toStrictEqual(c.expected);
        expect(result.getByItem(c.item)).toBeInstanceOf(Item);
      });
    }
  });

  describe("action removeItem", () => {
    const cases = [
      {
        name: "should remove",
        args: [i[0]],
        item: i[0],
        expected: 0
      },
      {
        name: "shouldn't remove non-member item",
        args: [i[0], i[1]],
        item: i[2],
        expected: 2
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const action = actions.removeItem(c.item);
        deepFreeze(action);
        let state = new Items(c.args);
        deepFreeze(state);

        const result = items(state, action);

        expect(result).toBeInstanceOf(Items);
        expect(result.length).toStrictEqual(c.expected);
      });
    }
  });

  describe("action changeItemName", () => {
    const cases = [
      {
        name: "should change item name",
        args: [i[0]],
        item: i[0],
        name: "new name",
        expected: "new name"
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const action = actions.changeItemName(c.item, c.name);
        deepFreeze(action);
        let state = new Items(c.args);
        deepFreeze(state);

        const result = items(state, action);

        expect(result).toBeInstanceOf(Items);
        expect(result.getByName(c.name).name).toStrictEqual(c.expected);
      });
    }
  });

  describe("action changeItemPoints", () => {
    const cases = [
      {
        name: "should change item's points",
        args: [i[0], i[1]],
        item: i[0],
        points: 43,
        expected: 43
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const action = actions.changeItemPoints(c.item, c.points);
        deepFreeze(action);
        let state = new Items(c.args);
        deepFreeze(state);

        const result = items(state, action);

        expect(result).toBeInstanceOf(Items);
        expect(result.getByName(c.item.name).points).toStrictEqual(c.expected);
      });
    }
  });
});

describe("huntName", () => {
  describe("action updateHuntName", () => {
    test("should update empty hunt name", () => {
      const action = actions.updateHuntName("hunt name");
      deepFreeze(action);
      let state = "";
      deepFreeze(state);

      const result = huntName(state, action);

      expect(typeof result === "string").toBeTruthy();
      expect(result === "hunt name").toBeTruthy();
    });
    test("should update non-empty hunt name", () => {
      const action = actions.updateHuntName("new");
      deepFreeze(action);
      let state = "old";
      deepFreeze(state);

      const result = huntName(state, action);

      expect(typeof result === "string").toBeTruthy();
      expect(result === "new").toBeTruthy();
    });
  });
});

describe("maxTeams", () => {
  describe("action updateMaxTeams", () => {
    test("should update empty max teams", () => {
      const action = actions.updateMaxTeams(3);
      deepFreeze(action);
      let state = 0;
      deepFreeze(state);

      const result = maxTeams(state, action);

      expect(typeof result === "number").toBeTruthy();
      expect(result === 3).toBeTruthy();
    });
    test("should update non-empty hunt name", () => {
      const action = actions.updateHuntName("new");
      deepFreeze(action);
      let state = "old";
      deepFreeze(state);

      const result = huntName(state, action);

      expect(typeof result === "string").toBeTruthy();
      expect(result === "new").toBeTruthy();
    });
  });
});

describe("startDate", () => {
  describe("action updateStart", () => {
    test("should update default start date", () => {
      const testDate = new Date(2020, 11, 21, 10);
      const action = actions.updateStart(testDate);
      deepFreeze(action);
      let state = null;

      const result = startDate(state, action);

      expect(result).toBeInstanceOf(Date);
      expect(result.getTime() === testDate.getTime()).toBeTruthy();
    });
    test("should update non-default end date", () => {
      const testDate = new Date(2020, 11, 21, 10);
      const action = actions.updateStart(testDate);
      deepFreeze(action);
      let state = new Date(2019, 10, 13, 9);

      const result = startDate(state, action);

      expect(result).toBeInstanceOf(Date);
      expect(result.getTime() === testDate.getTime()).toBeTruthy();
    });
  });

  describe("endDate", () => {
    describe("action updateEnd", () => {
      test("should update default end date", () => {
        const testDate = new Date(2020, 11, 21, 10);
        const action = actions.updateEnd(testDate);
        deepFreeze(action);
        let state = null;

        const result = endDate(state, action);

        expect(result).toBeInstanceOf(Date);
        expect(result.getTime() === testDate.getTime()).toBeTruthy();
      });
      test("should update non-default end date", () => {
        const testDate = new Date(2020, 11, 21, 10);
        const action = actions.updateEnd(testDate);
        deepFreeze(action);
        let state = new Date(2019, 10, 13, 9);

        const result = endDate(state, action);

        expect(result).toBeInstanceOf(Date);
        expect(result.getTime() === testDate.getTime()).toBeTruthy();
      });
    });
  });
});
