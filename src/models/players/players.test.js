/* eslint-disable no-loop-func */
import Players from "./players";
import Player from "../player";
import ScavengeResource from "../scavengeResource";
import { BASE_PATH } from "../../config";
import { addTestModel } from "../../testUtils";

const plrs = {
  dan: new Player({ email: "danMarino@gmail.com" }),
  pat: new Player({ email: "patSurtain@gmailcom" }),
  tom: new Player({ email: "tomBrady@gmail.com" }),
  wes: new Player({ email: "wesWelker@gmailcom" }),
  jim: new Player({ email: "jimKelly@gmail.com" }),
  bruce: new Player({ email: "bruceSmith@gmailcom" }),
  vinny: new Player({ email: "vinnyT@gmailcom" })
};

describe("players", () => {
  describe("consrtuctor", () => {
    const cases = [["null arg", null], ["valid array", [plrs.dan, plrs.pat]]];
    for (let c of cases) {
      test(c[0], () => {
        const result = new Players(c[1]);

        expect(result).toBeInstanceOf(Players);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.basePath).toStrictEqual(BASE_PATH);
      });
    }
  });

  describe("length", () => {
    const cases = [["null arg", null, 0], ["array of length 1", [plrs.dan], 1]];
    for (let c of cases) {
      test(c[0], () => {
        const players = new Players(c[1]);
        const result = players.length;

        expect(typeof result === "number").toBeTruthy();
        expect(result).toBe(c[2]);
      });
    }
  });

  describe("array", () => {
    const cases = [
      { name: "null constructor", args: null },
      { name: "valid array args", args: [plrs.dan, plrs.jim] }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const players = new Players(c.args);
        const result = players.array;

        expect(result).toBeInstanceOf(Array);
      });
    }
  });

  describe("add", () => {
    const cases = [
      {
        name: "to empty players",
        args: null,
        input: plrs.dan,
        expected: 1
      },
      {
        name: "to non-empty players",
        args: [plrs.dan, plrs.jim],
        input: plrs.bruce,
        expected: 3
      },
      {
        name: "try to add duplicate",
        args: [plrs.wes],
        input: plrs.wes,
        expected: 1
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const players = new Players(c.args);

        const result = players.add(c.input);

        expect(result).toBeInstanceOf(Players);
        expect(result.length).toBe(c.expected);
        expect(result.getByPlayer(c.input).equals(c.input)).toBeTruthy();
      });
    }
  });

  describe("remove", () => {
    const cases = [
      {
        name: "non-valid player",
        args: [plrs.dan],
        input: plrs.dan.email,
        expected: 1
      },
      {
        name: "valid player",
        args: [plrs.dan],
        input: plrs.dan,
        expected: 0
      },
      {
        name: "valid player that is not a member",
        args: [plrs.dan, plrs.bruce],
        input: plrs.jim,
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const players = new Players(c.args);
        const result = players.remove(c.input);

        expect(result).toBeInstanceOf(Players);
        expect(result.length).toBe(c.expected);
        expect(Boolean(result.getByPlayer(c.input))).toBeFalsy();
      });
    }
  });

  describe("copy", () => {
    const cases = [
      {
        name: "default players",
        args: null
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const players = new Players(c.args);

        const result = players.copy();
        expect(result).toBeInstanceOf(Players);
      });
    }
  });

  describe("getByTeamID", () => {
    const cases = [
      {
        name: "member team",
        args: [plrs.dan.changeTeam(3), plrs.bruce],
        input: 3,
        expected: true
      },
      {
        name: "non-member team",
        args: [plrs.dan.changeTeam(4)],
        input: 1,
        expected: false
      },
      {
        name: "invalid args",
        args: [plrs.dan.changeTeam(4)],
        input: "4",
        expected: false
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const players = new Players(c.args);

        const result = players.getByTeamID(c.input);
        expect(result).toBeInstanceOf(Players);

        if (c.expected) {
          expect(result.length).toBeGreaterThan(0);
        }
      });
    }
  });

  describe("getByEmail", () => {
    const cases = [
      {
        name: "member player",
        args: [plrs.dan, plrs.tom],
        input: plrs.dan.email,
        expected: true
      },
      {
        name: "non-member player",
        args: [plrs.dan, plrs.tom],
        input: plrs.bruce.email,
        expected: false
      },
      {
        name: "invalid args",
        args: [plrs.dan, plrs.tom],
        input: plrs.bruce,
        expected: false
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const players = new Players(c.args);

        const result = players.getByEmail(c.input);
        expect(Boolean(result)).toBe(c.expected);

        if (c.expected) {
          expect(result).toBeInstanceOf(Player);
          expect(result.email === c.input).toBeTruthy();
        }
      });
    }
  });
  /*
  describe("apiRetrievePlayers", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Players([], 43)),
        expected: {
          url: BASE_PATH + `/teams/43/players/`,
          method: "GET"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrievePlayers"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
  */
});
