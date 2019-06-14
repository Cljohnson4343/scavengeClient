/* eslint-disable no-loop-func */
import {
  endDate,
  huntName,
  items,
  maxTeams,
  players,
  startDate,
  teams
} from "./reducer";
import * as actions from "../actions";
import { Item, Items, Player, Team, Teams, Players } from "../models";

const plrs = {
  dan: new Player({ email: "danMarino@gmail.com" }),
  pat: new Player({ email: "patSurtain@gmailcom" }),
  tom: new Player({ email: "tomBrady@gmail.com" }),
  wes: new Player({ email: "wesWelker@gmailcom" }),
  jim: new Player({ email: "jimKelly@gmail.com" }),
  bruce: new Player({ email: "bruceSmith@gmailcom" }),
  vinny: new Player({ email: "vinnyT@gmailcom" })
};

describe("teams", () => {
  describe("action addTeam", () => {
    test("should add a team when state is empty", () => {
      const action = actions.addTeam("Dolphins");
      let state = new Teams([]);

      const result = teams(state, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBeGreaterThan(0);
    });
    test("should add team when state isn't empty", () => {
      const testState = new Teams([new Team({ teamName: "Bills" })]);
      const action = actions.addTeam("Fins");

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBeGreaterThan(1);
    });
  });

  describe("action removeTeam", () => {
    test("should remove a team", () => {
      const bills = new Team({ teamName: "Bills" });
      const testState = new Teams([bills]);
      const action = actions.removeTeam(bills);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBe(0);
    });
    test("should remove the correct team", () => {
      const pats = new Team({ teamName: "pats" });
      const testState = new Teams([new Team({ teamName: "fins" }), pats]);
      const action = actions.removeTeam(pats);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});

describe("players", () => {
  describe("action addPlayer", () => {
    test("should add a player when state is empty", () => {
      const action = actions.addPlayer("cj@gmail.com");
      let state = new Players();

      const result = players(state, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBeGreaterThan(0);
      expect(result.getByEmail("cj@gmail.com")).toBeInstanceOf(Player);
    });
    test("should add player when state isn't empty", () => {
      const testState = new Players([new Player({ email: "cj@yahoo.com" })]);
      const action = actions.addPlayer("cj@gmail.com");

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBeGreaterThan(1);
      expect(result.getByEmail("cj@gmail.com")).toBeInstanceOf(Player);
    });
  });

  describe("action removePlayer", () => {
    test("should remove a player", () => {
      const testState = new Players([new Player({ email: "cj@gmail.com" })]);
      const action = actions.removePlayer("cj@gmail.com");

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBe(0);
    });
    test("should remove the correct team", () => {
      const testState = new Players([
        new Player({ email: "cj@gmail.com" }),
        new Player({ email: "cj@yahoo.com" })
      ]);
      const action = actions.removePlayer("cj@gmail.com");

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBeGreaterThan(0);
      expect(Boolean(result.getByEmail("cj@gmail.com"))).toBeFalsy();
    });
  });

  describe("action changePlayersTeam", () => {
    test("should update a player's team", () => {
      const fins = new Team({ teamName: "fins", teamID: 1 });
      const gmail = new Player({ email: "cj@gmail.com" });

      const testState = new Players([gmail]);
      const action = actions.changePlayersTeam(gmail, fins);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Players);
      expect(result.length).toBe(1);
      expect(result.getByPlayer(gmail).teamID).toStrictEqual(fins.teamID);
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
        let state = new Items(c.args);

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
        let state = new Items(c.args);

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
        newName: "new name",
        expected: "new name"
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const action = actions.changeItemName(c.item, c.newName);
        let state = new Items(c.args);

        const result = items(state, action);

        expect(result).toBeInstanceOf(Items);
        expect(result.getByName(c.newName).name).toStrictEqual(c.expected);
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
        let state = new Items(c.args);

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
      let state = "";

      const result = huntName(state, action);

      expect(typeof result === "string").toBeTruthy();
      expect(result === "hunt name").toBeTruthy();
    });
    test("should update non-empty hunt name", () => {
      const action = actions.updateHuntName("new");
      let state = "old";

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
      let state = 0;

      const result = maxTeams(state, action);

      expect(typeof result === "number").toBeTruthy();
      expect(result === 3).toBeTruthy();
    });
    test("should update non-empty hunt name", () => {
      const action = actions.updateHuntName("new");
      let state = "old";

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
      let state = null;

      const result = startDate(state, action);

      expect(result).toBeInstanceOf(Date);
      expect(result.getTime() === testDate.getTime()).toBeTruthy();
    });
    test("should update non-default end date", () => {
      const testDate = new Date(2020, 11, 21, 10);
      const action = actions.updateStart(testDate);
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
        let state = null;

        const result = endDate(state, action);

        expect(result).toBeInstanceOf(Date);
        expect(result.getTime() === testDate.getTime()).toBeTruthy();
      });
      test("should update non-default end date", () => {
        const testDate = new Date(2020, 11, 21, 10);
        const action = actions.updateEnd(testDate);
        let state = new Date(2019, 10, 13, 9);

        const result = endDate(state, action);

        expect(result).toBeInstanceOf(Date);
        expect(result.getTime() === testDate.getTime()).toBeTruthy();
      });
    });
  });
});
