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
    let player = new Player({ email: email });
    deepFreeze(player);

    expect(player).toBeInstanceOf(Player);
    expect(player).toBeInstanceOf(ScavengeResource);
    expect(player.email).toBe(expected);
  });

  test.each`
    email           | teamID | expected
    ${emails.gmail} | ${3}   | ${3}
    ${emails.aol}   | ${2}   | ${2}
  `(
    "constructs a Player with the right team",
    ({ email, teamID, expected }) => {
      let player = new Player({ email: email, teamID: teamID });
      deepFreeze(player);

      expect(player).toBeInstanceOf(Player);
      expect(player.teamID).toStrictEqual(expected);
    }
  );

  test.each`
    email           | originalTeam | newTeam
    ${emails.gmail} | ${3}         | ${2}
    ${emails.aol}   | ${0}         | ${4}
    ${emails.aol}   | ${3}         | ${0}
  `(
    "changeTeam returns a new Player with team added w/out modifying original Player",
    ({ email, originalTeam, newTeam }) => {
      let plr = new Player({ email: email, teamID: originalTeam });
      deepFreeze(plr);
      if (newTeam) {
        deepFreeze(newTeam);
      }

      let newPlr = plr.changeTeam(newTeam);

      expect(newPlr).toBeInstanceOf(Player);
      expect(newPlr.teamID).toStrictEqual(newTeam);
    }
  );

  test.each`
    originalEmail   | newEmail
    ${emails.gmail} | ${emails.aol}
    ${null}         | ${emails.gmail}
    ${emails.gmail} | ${null}
  `(
    "changeEmail returns a new Player with email added w/out modifying original Player",
    ({ originalEmail, newEmail }) => {
      let plr = new Player({ email: originalEmail });
      deepFreeze(plr);

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
    const plr = new Player({ email: emails.yahoo });
    deepFreeze(plr);

    const newPlr = plr.copy();
    expect(newPlr).toBeInstanceOf(Player);
    expect(plr.equals(newPlr)).toBeTruthy();
  });

  describe("apiCreatePlayer", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(
          new Player({ email: "email", huntID: 43, userID: 23 })
        ),
        expected: {
          url: BASE_PATH + "/hunts/43/players/",
          method: "POST"
        }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiCreatePlayer"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).toInclude("userID");
      });
    }
  });

  describe("apiDeletePlayer", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(
          new Player({ email: "email", huntID: 43, userID: 23 })
        ),
        expected: {
          url: BASE_PATH + "/hunts/43/players/23",
          method: "DELETE"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiDeletePlayer"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
