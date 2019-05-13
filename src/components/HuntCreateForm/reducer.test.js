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
import { Player, Team } from "../../models";

describe("teams", () => {
  describe("action addTeam", () => {
    test("should add a team when state is empty", () => {
      const action = actions.addTeam("Dolphins");
      deepFreeze(action);
      let state = [];
      deepFreeze(state);

      const result = teams(state, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(Team);
    });
    test("should add team when state isn't empty", () => {
      const testState = [new Team("Bills")];
      const action = actions.addTeam("Fins");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(1);
      expect(result[1]).toBeInstanceOf(Team);
    });
  });

  describe("action removeTeam", () => {
    test("should remove a team", () => {
      const testState = [new Team("Bills")];
      const action = actions.removeTeam("Bills");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(0);
    });
    test("should remove the correct team", () => {
      const testState = [new Team("fins"), new Team("pats")];
      const action = actions.removeTeam("pats");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(Team);
    });
  });

  describe("action changePlayersTeam", () => {
    test("should remove a player from team's player list", () => {
      const bills = new Team("bills");
      const testPlayer = new Player("cj@gmail.com", bills);
      bills.addPlayer(testPlayer);

      const testState = [bills];
      const action = actions.changePlayersTeam("cj@gmail.com", "fins");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].hasPlayer(testPlayer)).toBeFalsy();
    });
    test("should add a player to team's player list", () => {
      const fins = new Team("fins");
      const testPlayer = new Player("cj@gmail.com");

      const testState = [fins];
      const action = actions.changePlayersTeam("cj@gmail.com", "fins");
      deepFreeze(action);
      deepFreeze(testState);

      const result = teams(testState, action);

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(1);
      expect(result[0].hasPlayer(testPlayer)).toBeTruthy();
    });
  });
});
