import Team from "./team";
import Player from "../player";

test.each`
  name          | expected
  ${"Dolphins"} | ${"Dolphins"}
  ${""}         | ${""}
`("constructs a Team with the name ${name}", ({ name, expected }) => {
  let team = new Team(name);

  expect(team.name).toBe(expected);
});

test.each`
  name          | players                                                     | expected
  ${"Dolphins"} | ${[new Player("cj43@gmail.com"), new Player("ab@aol.com")]} | ${2}
  ${"Bills"}    | ${[new Player("abc@yahoo.com")]}                            | ${1}
`(
  "constructs a Team with the right number of players",
  ({ name, players, expected }) => {
    let team = new Team(name, players);

    expect(team.players.length).toBe(expected);
  }
);

test.each`
  name          | player                          | expected
  ${"Dolphins"} | ${new Player("cj43@gmail.com")} | ${1}
  ${"Bills"}    | ${new Player("abc@yahoo.com")}  | ${1}
`(
  "addPlayer adds ${player.email} to team ${name}",
  ({ name, player, expected }) => {
    let team = new Team(name);

    expect(team.players.length).toBeFalsy();
    team.addPlayer(player);
    expect(team.players.length).toBe(expected);
  }
);

const players = [new Player("cj43@gmail.com"), new Player("ab@aol.com")];
test("removePlayer removes player from team name", () => {
  const team = new Team("Dolphins", players);
  expect(team.players[0] instanceof Player).toBeTruthy();
  team.removePlayer(players[0]);
  expect(team.players.length).toBe(1);
});

test("hasPlayer identifies a player", () => {
  const team = new Team("Dolphins", players);
  expect(team.hasPlayer(players[0])).toBeTruthy();
});

test("hasPlayer identifies when a team doesn't have a player", () => {
  const team = new Team("Dolphins", players);
  const newPlayer = new Player("up");
  expect(team.hasPlayer(newPlayer)).toBeFalsy();
});
