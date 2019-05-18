import deepFreeze from "deep-freeze";
import Team from "./team";
import Player from "../player";
import ScavengeResource from "../scavengeResource";

describe("Team", () => {
  const afcEast = {
    fins: new Team("fins"),
    bills: new Team("bills"),
    pats: new Team("pats"),
    jets: new Team("jets")
  };

  test.each`
    name          | expected
    ${"Dolphins"} | ${"Dolphins"}
    ${""}         | ${""}
  `("constructs a Team with the name $name", ({ name, expected }) => {
    let team = new Team(name);
    deepFreeze(team);

    expect(team).toBeInstanceOf(Team);
    expect(team).toBeInstanceOf(ScavengeResource);
    expect(team.name).toBe(expected);
    expect(team.path).toStrictEqual("/teams");
  });

  test.each`
    name          | players                                                     | expected
    ${"Dolphins"} | ${[new Player("cj43@gmail.com"), new Player("ab@aol.com")]} | ${2}
    ${"Bills"}    | ${[new Player("abc@yahoo.com")]}                            | ${1}
  `(
    "constructs a Team with the right number of players",
    ({ name, players, expected }) => {
      let team = new Team(name, players);
      deepFreeze(team);

      expect(team.players.length).toBe(expected);
    }
  );

  test.each`
    name          | player                          | expected
    ${"Dolphins"} | ${new Player("cj43@gmail.com")} | ${1}
    ${"Bills"}    | ${new Player("abc@yahoo.com")}  | ${1}
  `(
    "addPlayer returns a new Team with player added $player.email",
    ({ name, player, expected }) => {
      let team = new Team(name);
      deepFreeze(team);

      expect(team.players.length).toBeFalsy();
      const newTeam = team.addPlayer(player);
      expect(newTeam).toBeInstanceOf(Team);
      expect(newTeam.players.length).toBe(expected);
      expect(newTeam.players[0].equals(player)).toBeTruthy();
    }
  );

  const players = [new Player("cj43@gmail.com"), new Player("ab@aol.com")];
  test("removePlayer returns a new team with player removed", () => {
    const team = new Team("Dolphins", players);
    deepFreeze(team);

    expect(team.players[0] instanceof Player).toBeTruthy();
    const newTeam = team.removePlayer(players[0]);
    expect(newTeam).toBeInstanceOf(Team);
    expect(newTeam.players.length).toBe(1);
    expect(newTeam.players[0].equals(players[1])).toBeTruthy();
  });

  test("hasPlayer identifies a player", () => {
    const team = new Team("Dolphins", players);
    deepFreeze(team);

    expect(team.hasPlayer(players[0])).toBeTruthy();
  });

  test("hasPlayer identifies when a team doesn't have a player", () => {
    const team = new Team("Dolphins", players);
    const newPlayer = new Player("up");
    deepFreeze(team);
    deepFreeze(newPlayer);

    expect(team.hasPlayer(newPlayer)).toBeFalsy();
  });

  test("team should contain copy of name", () => {
    let teamName = "Bills";
    const team = new Team(teamName);
    deepFreeze(team);

    teamName = "Fins";

    expect(team.name !== teamName).toBeTruthy();
  });

  test("copy returns a new team that is equal to original team", () => {
    const team = new Team("fins", players);
    deepFreeze(team);

    let newTeam = team.copy();
    expect(newTeam).toBeInstanceOf(Team);
    expect(newTeam.equals(team)).toBeTruthy();
  });

  test.each`
    team            | originalName         | newName
    ${afcEast.fins} | ${afcEast.fins.name} | ${"new Name"}
    ${afcEast.fins} | ${afcEast.fins.name} | ${""}
    ${afcEast.fins} | ${afcEast.fins.name} | ${null}
  `(
    "changeName returns a new Team with name added w/out modifying original Team",
    ({ team, originalName, newName }) => {
      deepFreeze(team);

      let newTeam = team.changeName(newName);

      expect(newTeam).toBeInstanceOf(Team);
      if (newName) {
        expect(newTeam.name).toBe(newName);
      }
      if (originalName) {
        expect(team.name).toBe(originalName);
      }
    }
  );
});
