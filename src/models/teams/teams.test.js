/* eslint-disable no-loop-func */
import { Teams } from "./teams";
import deepFreeze from "deep-freeze";
import Team from "../team";
import { ScavengeError } from "../../utils";
import Player from "../player";

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

describe("teams", () => {
  describe("consrtuctor", () => {
    const cases = [["null arg", null], ["valid array", [afc.bills, afc.fins]]];
    for (let c of cases) {
      test(c[0], () => {
        const result = new Teams(c[1]);

        expect(result).toBeInstanceOf(Teams);
      });
    }
  });

  describe("length", () => {
    const cases = [["null arg", null, 0], ["array of length 1", [afc.jets], 1]];
    for (let c of cases) {
      test(c[0], () => {
        const teams = new Teams(c[1]);
        const result = teams.length;

        expect(typeof result === "number").toBeTruthy();
        expect(result).toBe(c[2]);
      });
    }
  });

  describe("array", () => {
    const cases = [
      { name: "null constructor", args: null },
      { name: "valid array args", args: [afc.fins, afc.pars] }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        const result = teams.array;

        expect(result).toBeInstanceOf(Array);
      });
    }
  });

  describe("validateTeamName", () => {
    const cases = [
      {
        name: "null constructor",
        args: null,
        input: "valid name",
        maxTeams: 5,
        ignore: null,
        expected: true
      },
      {
        name: "array constructor w/valid name",
        args: [afc.fins, afc.jets],
        input: "valid name",
        maxTeams: 5,
        ignore: null,
        expected: true
      },
      {
        name: "array constructor w/ invalid name",
        args: [afc.fins, afc.jets],
        input: afc.fins.name,
        maxTeams: 5,
        ignore: null,
        expected: false
      },
      {
        name: "valid name but number teams ==== max teams",
        args: [afc.fins, afc.jets],
        input: "valid name",
        maxTeams: 2,
        ignore: null,
        expected: false
      },
      {
        name: "valid name but number teams > max teams",
        args: [afc.fins, afc.jets],
        input: "valid name",
        maxTeams: 1,
        ignore: null,
        expected: false
      },
      {
        name: "no teams but max teams is zero",
        args: null,
        input: "valid name",
        maxTeams: 0,
        ignore: null,
        expected: false
      },
      {
        name: "invalid name but name is ignored",
        args: [afc.fins],
        input: afc.fins.name,
        maxTeams: 12,
        ignore: afc.fins.name,
        expected: true
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        deepFreeze(teams);
        const result = teams.validateTeamName(c.maxTeams, c.input, c.ignore);

        expect(result).toBeInstanceOf(ScavengeError);
        expect(!result.inError).toBe(c.expected);
      });
    }
  });

  describe("add", () => {
    const cases = [
      {
        name: "to empty teams",
        args: null,
        input: afc.fins,
        expected: 1
      },
      {
        name: "to non-empty teams",
        args: [afc.fins, afc.jets],
        input: afc.pats,
        expected: 3
      },
      {
        name: "try to add duplicate",
        args: [afc.fins],
        input: afc.fins,
        expected: 1
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        deepFreeze(teams);

        const result = teams.add(c.input);

        expect(result).toBeInstanceOf(Teams);
        expect(result.length).toBe(c.expected);
      });
    }
  });

  describe("remove", () => {
    const cases = [
      {
        name: "non-valid team",
        args: [afc.fins],
        input: "fins",
        expected: 1
      },
      {
        name: "valid team",
        args: [afc.fins],
        input: afc.fins,
        expected: 0
      },
      {
        name: "valid team that is not a member",
        args: [afc.pats, afc.jets],
        input: afc.fins,
        expected: 2
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        deepFreeze(teams);
        const result = teams.remove(c.input);

        expect(result).toBeInstanceOf(Teams);
        expect(result.length).toBe(c.expected);
        expect(Boolean(result.getByTeam(c.input))).toBeFalsy();
      });
    }
  });

  describe("change", () => {
    const cases = [
      {
        name: "valid player",
        args: [afc.pats.addPlayer(plrs.tom), afc.fins],
        oldTeam: afc.pats,
        player: plrs.tom,
        newTeam: afc.fins
      },
      {
        name: "valid player",
        args: [afc.pats, afc.fins.addPlayer(plrs.tom)],
        oldTeam: afc.fins,
        player: plrs.tom,
        newTeam: null
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        let teams = new Teams(c.args);
        deepFreeze(teams);

        const result = teams.change(c.player, c.newTeam);
        expect(result).toBeInstanceOf(Teams);

        const oldTeam = result.getByTeam(c.oldTeam);
        expect(oldTeam.hasPlayer(c.player)).toBeFalsy();

        if (c.newTeam instanceof Team) {
          const newTeam = result.getByTeam(c.newTeam);
          expect(newTeam.hasPlayer(c.player)).toBeTruthy();
        }
      });
    }
  });

  describe("changeTeamName", () => {
    const cases = [
      {
        name: "valid old name and new name",
        args: [afc.fins, afc.pats],
        oldName: afc.pats.name,
        newName: afc.jets.name
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        deepFreeze(teams);

        const result = teams.changeTeamName(c.oldName, c.newName);
        expect(result).toBeInstanceOf(Teams);

        expect(Boolean(result.getByName(c.oldName))).toBeFalsy();
        expect(Boolean(result.getByName(c.newName))).toBeTruthy();
      });
    }
  });

  describe("copy", () => {
    const cases = [
      {
        name: "default teams",
        args: null
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        deepFreeze(teams);

        const result = teams.copy();
        expect(result).toBeInstanceOf(Teams);
      });
    }
  });

  describe("getByName", () => {
    const cases = [
      {
        name: "member team",
        args: [afc.fins],
        input: afc.fins.name,
        expected: true
      },
      {
        name: "non-member team",
        args: [afc.fins],
        input: afc.bills.name,
        expected: false
      },
      {
        name: "invalid args",
        args: [afc.bills, afc.fins],
        input: afc.jets,
        expected: false
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        deepFreeze(teams);

        const result = teams.getByName(c.input);
        expect(Boolean(result)).toBe(c.expected);

        if (c.expected) {
          expect(result).toBeInstanceOf(Team);
          expect(result.name === c.input).toBeTruthy();
        }
      });
    }
  });

  describe("getByTeam", () => {
    const cases = [
      {
        name: "member team",
        args: [afc.fins],
        input: afc.fins,
        expected: true
      },
      {
        name: "non-member team",
        args: [afc.fins],
        input: afc.bills,
        expected: false
      },
      {
        name: "invalid args",
        args: [afc.bills, afc.fins],
        input: afc.jets.name,
        expected: false
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
        deepFreeze(teams);

        const result = teams.getByTeam(c.input);
        expect(Boolean(result)).toBe(c.expected);

        if (c.expected) {
          expect(result).toBeInstanceOf(Team);
          expect(result.equals(c.input)).toBeTruthy();
        }
      });
    }
  });
});
