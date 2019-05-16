import deepFreeze from "deep-freeze";
import { Player, Team } from "../../models";
import * as a from "./actions.js";

describe("action addTeam", () => {
  test("should return an add team action", () => {
    const teamName = "Dolphins";
    const result = a.addTeam(teamName);

    expect(result.type).toBe("add_team");
    expect(result.payload).toBeInstanceOf(Team);
  });
});

describe("action removeTeam", () => {
  test("should return a remove team action", () => {
    const team = new Team("Dolphins");
    const result = a.removeTeam(team);

    expect(result.type).toBe("remove_team");
    expect(result.payload.team).toBeInstanceOf(Team);
  });
});

describe("action changePlayersTeam", () => {
  test("should return a change players team action", () => {
    const team = new Team("Dolphins");
    const player = new Player("cj@gmail.com");
    const result = a.changePlayersTeam(player, team);

    expect(result.type).toBe("change_players_team");
    expect(result.payload.player).toBeInstanceOf(Player);
    expect(result.payload.team).toBeInstanceOf(Team);
  });
});

describe("action addPlayer", () => {
  test("should return an add player action", () => {
    const email = "cj@gmail.com";
    const result = a.addPlayer(email);

    expect(result.type).toBe("add_player");
    expect(result.payload).toBeInstanceOf(Player);
  });
});

describe("action removePlayer", () => {
  test("should return a remove player action", () => {
    const email = "cj@gmail.com";
    const result = a.removePlayer(email);

    expect(result.type).toBe("remove_player");
    expect(result.payload).toBeInstanceOf(Player);
  });
});

describe("action updateHuntName", () => {
  test("should return an update hunt name action", () => {
    const huntName = "The Game";
    const result = a.updateHuntName(huntName);

    expect(result.type).toBe("update_hunt_name");
    expect(typeof result.payload === "string").toBeTruthy();
  });
});

describe("action updateMaxTeams", () => {
  test("should return an update max teams action", () => {
    const numTeams = 3;
    const result = a.updateMaxTeams(numTeams);

    expect(result.type).toBe("update_max_teams");
    expect(typeof result.payload === "number").toBeTruthy();
  });
});

describe("action updateStart", () => {
  test("should return an update start date action", () => {
    const startDate = new Date();
    const result = a.updateStart(startDate);

    expect(result.type).toBe("update_start");
    expect(result.payload).toBeInstanceOf(Date);
  });
});

describe("action updateEnd", () => {
  test("should return an update end date action", () => {
    const endDate = new Date();
    const result = a.updateEnd(endDate);

    expect(result.type).toBe("update_end");
    expect(result.payload).toBeInstanceOf(Date);
  });
});

describe("action changeTeamName", () => {
  test("should return a change team name action", () => {
    const oldName = "Dolphins";
    const newName = "fins";
    const result = a.changeTeamName(oldName, newName);

    expect(result.type).toBe("change_team_name");
    expect(result.payload.newName).toBe(newName);
    expect(result.payload.oldName).toBe(oldName);
  });
});
