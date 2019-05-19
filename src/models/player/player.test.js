import deepFreeze from "deep-freeze";
import Team from "../team";
import Player from "./player";
import ScavengeResource from "../scavengeResource";
import { addTestModel } from "../../testUtils";
import { BASE_PATH } from "../../config";

describe("Player", () => {
  const afcEast = {
    fins: new Team("fins"),
    bills: new Team("bills"),
    pats: new Team("pats"),
    jets: new Team("jets")
  };
  deepFreeze(afcEast);

  const emails = {
    gmail: "cj43@gmail.com",
    aol: "cj43@aol.com",
    yahoo: "cj43@yahoo.com"
  };
  deepFreeze(emails);

  test.each`
    email           | expected
    ${emails.gmail} | ${emails.gmail}
    ${""}           | ${""}
  `("constructs a Player with the email $email", ({ email, expected }) => {
    let player = new Player(email);
    deepFreeze(player);

    expect(player).toBeInstanceOf(Player);
    expect(player).toBeInstanceOf(ScavengeResource);
    expect(player.email).toBe(expected);
  });

  test.each`
    email           | team             | expected
    ${emails.gmail} | ${afcEast.fins}  | ${afcEast.fins}
    ${emails.aol}   | ${afcEast.bills} | ${afcEast.bills}
  `("constructs a Player with the right team", ({ email, team, expected }) => {
    let player = new Player(email, team);
    deepFreeze(player);

    expect(player).toBeInstanceOf(Player);
    expect(player.team).toBeInstanceOf(Team);
    expect(player.team.equals(expected));
  });

  test.each`
    email           | originalTeam    | newTeam
    ${emails.gmail} | ${afcEast.fins} | ${afcEast.bills}
    ${emails.aol}   | ${null}         | ${afcEast.fins}
    ${emails.aol}   | ${afcEast.fins} | ${null}
  `(
    "changeTeam returns a new Player with team added w/out modifying original Player",
    ({ email, originalTeam, newTeam }) => {
      let plr = new Player(email, originalTeam);
      deepFreeze(plr);
      if (newTeam) {
        deepFreeze(newTeam);
      }

      let newPlr = plr.changeTeam(newTeam);

      expect(newPlr).toBeInstanceOf(Player);
      if (newTeam) {
        expect(newPlr.team).toBeInstanceOf(Team);
        expect(newPlr.team.equals(newTeam)).toBeTruthy();
      }
      if (originalTeam) {
        expect(plr.team).toBeInstanceOf(Team);
        expect(plr.team.equals(originalTeam)).toBeTruthy();
      }
    }
  );

  test.each`
    team            | originalEmail   | newEmail
    ${afcEast.fins} | ${emails.gmail} | ${emails.aol}
    ${afcEast.fins} | ${null}         | ${emails.gmail}
    ${afcEast.fins} | ${emails.gmail} | ${null}
  `(
    "changeEmail returns a new Player with email added w/out modifying original Player",
    ({ team, originalEmail, newEmail }) => {
      let plr = new Player(originalEmail, team);
      deepFreeze(plr);
      deepFreeze(team);

      let newPlr = plr.changeEmail(newEmail);

      expect(newPlr).toBeInstanceOf(Player);
      if (newEmail) {
        expect(newPlr.email).toBe(newEmail);
      }
      if (originalEmail) {
        expect(plr.email).toBe(originalEmail);
      }
    }
  );

  test("copy returns a new Player that equals original Player", () => {
    const plr = new Player(emails.yahoo, afcEast.fins);
    deepFreeze(plr);

    const newPlr = plr.copy();
    expect(newPlr).toBeInstanceOf(Player);
    expect(plr.equals(newPlr)).toBeTruthy();
  });

  describe("apiCreatePlayer", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Player("email", new Team(), 43, 23)),
        expected: {
          url: BASE_PATH + "/teams/43/players/",
          method: "POST"
        },
        data: { test: "data" }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiCreatePlayer"](c.data);

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });

  describe("apiDeletePlayer", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Player("email", new Team(), 43, 23)),
        expected: {
          url: BASE_PATH + "/teams/43/players/23",
          method: "DELETE"
        },
        data: { test: "data" }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiDeletePlayer"](c.data);

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
