/* eslint-disable no-loop-func */
import Players from "./players";
import Team from "../team";
import Player from "../player";
import ScavengeResource from "../scavengeResource";
import { BASE_PATH } from "../../config";
import { addTestModel } from "../../testUtils";

const afc = {
  fins: new Team("fins"),
  bills: new Team("bills"),
  pats: new Team("pats"),
  jets: new Team("jets")
};

const plrs = {
  dan: new Player("danMarino@gmail.com", afc.fins),
  pat: new Player("patSurtain@gmailcom", afc.fins),
  tom: new Player("tomBrady@gmail.com", afc.pats),
  wes: new Player("wesWelker@gmailcom", afc.pats),
  jim: new Player("jimKelly@gmail.com", afc.bills),
  bruce: new Player("bruceSmith@gmailcom", afc.bills),
  vinny: new Player("vinnyT@gmailcom", afc.jets)
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

  describe("change", () => {
    const cases = [
      {
        name: "valid player",
        args: [plrs.dan.changeTeam(afc.pats), plrs.bruce],
        oldTeam: afc.pats,
        player: plrs.dan.changeTeam(afc.pats),
        newTeam: afc.fins
      },
      {
        name: "valid player no new team",
        args: [plrs.dan.changeTeam(afc.fins), plrs.wes],
        oldTeam: afc.fins,
        player: plrs.dan,
        newTeam: null
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        let players = new Players(c.args);

        const result = players.change(c.player, c.newTeam);
        expect(result).toBeInstanceOf(Players);

        c.player = result.getByPlayer(c.player);
        expect(c.player instanceof Player).toBeTruthy();

        if (c.newTeam instanceof Team) {
          expect(c.player.team.equals(c.oldTeam)).toBeFalsy();
          expect(c.player.team.equals(c.newTeam)).toBeTruthy();
        }
      });
    }
  });

  describe("changeTeamName", () => {
    const cases = [
      {
        name: "valid old name and new name",
        args: [plrs.dan.changeTeam(afc.pats), plrs.jim.changeTeam(afc.pats)],
        oldName: afc.pats.name,
        newName: afc.jets.name
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        let players = new Players(c.args);

        const result = players.changeTeamName(c.oldName, c.newName);
        expect(result).toBeInstanceOf(Players);

        expect(
          result.getByPlayer(c.args[0]).team.name === c.newName
        ).toBeTruthy();
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

  describe("getByTeam", () => {
    const cases = [
      {
        name: "member team",
        args: [plrs.dan.changeTeam(afc.fins), plrs.bruce],
        input: afc.fins,
        expected: true
      },
      {
        name: "non-member team",
        args: [plrs.dan.changeTeam(afc.fins)],
        input: afc.bills,
        expected: false
      },
      {
        name: "invalid args",
        args: [plrs.dan.changeTeam(afc.fins)],
        input: afc.fins.name,
        expected: false
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const players = new Players(c.args);

        const result = players.getByTeam(c.input);
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

  describe("apiRetrievePlayers", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Players([afc.fins, afc.jets], 43)),
        expected: {
          url: BASE_PATH + `/teams/43/players/`,
          method: "GET"
        },
        data: { test: "data" }
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrievePlayers"](c.data);

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
