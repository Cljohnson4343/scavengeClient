import deepFreeze from "deep-freeze";
import {
  endDate,
  huntName,
  maxTeams,
  players,
  startDate,
  teams
} from "./reducer";
import * as actions from "./actions";
import { Player, Team, Teams } from "../../models";

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
      const testState = new Teams([new Team("Bills")]);
      const action = actions.removeTeam("Bills");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBe(0);
    });
    test("should remove the correct team", () => {
      const testState = new Teams([new Team("fins"), new Team("pats")]);
      const action = actions.removeTeam("pats");
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
      const action = actions.changePlayersTeam("cj@gmail.com", "fins");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBe(1);
    });
    test("should add a player to team's player list", () => {
      const fins = new Team("fins");
      const testPlayer = new Player("cj@gmail.com");

      const testState = new Teams([fins]);
      const action = actions.changePlayersTeam("cj@gmail.com", "fins");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Teams);
      expect(result.length).toBe(1);
    });
  });
});

describe("players", () => {
  describe("action addPlayer", () => {
    test("should add a player when state is empty", () => {
      const action = actions.addPlayer("cj@gmail.com");
      deepFreeze(action);
      let state = [];
      deepFreeze(state);

      const result = players(state, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(Player);
    });
    test("should add player when state isn't empty", () => {
      const testState = [new Player("cj@yahoo.com")];
      const action = actions.addPlayer("cj@gmail.com");
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(1);
      expect(result[1]).toBeInstanceOf(Player);
    });
  });

  describe("action removePlayer", () => {
    test("should remove a player", () => {
      const testState = [new Player("cj@gmail.com")];
      const action = actions.removePlayer("cj@gmail.com");
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(0);
    });
    test("should remove the correct team", () => {
      const testState = [
        new Player("cj@gmail.com"),
        new Player("cj@yahoo.com")
      ];
      const action = actions.removePlayer("cj@gmail.com");
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(Player);
    });
  });

  describe("action changePlayersTeam", () => {
    test("should update a player's team", () => {
      const gmail = new Player("cj@gmail.com");
      const fins = new Team("fins");

      const testState = [gmail];
      const action = actions.changePlayersTeam("cj@gmail.com", "fins");
      deepFreeze(action);
      deepFreeze(testState);

      const result = players(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].team).toBeInstanceOf(Team);
      expect(result[0].team.equals(fins)).toBeTruthy();
    });
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
