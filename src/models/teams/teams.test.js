/* eslint-disable no-loop-func */
import Teams from "./teams";
import Team from "../team";
import { ScavengeError } from "../../utils";
import Player from "../player";
import ScavengeResource from "../scavengeResource";
import { addTestModel } from "../../testUtils";
import { BASE_PATH } from "../../config";

const afc = {
  fins: new Team({ teamName: "fins", teamID: 1 }),
  bills: new Team({ teamName: "bills", teamID: 2 }),
  pats: new Team({ teamName: "pats", teamID: 3 }),
  jets: new Team({ teamName: "jets", teamID: 4 })
};

describe("teams", () => {
  describe("consrtuctor", () => {
    const cases = [["null arg", null], ["valid array", [afc.bills, afc.fins]]];
    for (let c of cases) {
      test(c[0], () => {
        const result = new Teams(c[1]);

        expect(result).toBeInstanceOf(Teams);
        expect(result).toBeInstanceOf(ScavengeResource);
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
        input: afc.fins.teamName,
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
        input: afc.fins.teamName,
        maxTeams: 12,
        ignore: afc.fins.teamName,
        expected: true
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);
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
        const result = teams.remove(c.input);

        expect(result).toBeInstanceOf(Teams);
        expect(result.length).toBe(c.expected);
        expect(Boolean(result.getByTeam(c.input))).toBeFalsy();
      });
    }
  });

  describe("changeTeamName", () => {
    const cases = [
      {
        name: "valid old name and new name",
        args: [afc.fins, afc.pats],
        oldName: afc.pats.teamName,
        newName: afc.jets.teamName
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        const teams = new Teams(c.args);

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
        input: afc.fins.teamName,
        expected: true
      },
      {
        name: "non-member team",
        args: [afc.fins],
        input: afc.bills.teamName,
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

        const result = teams.getByName(c.input);
        expect(Boolean(result)).toBe(c.expected);

        if (c.expected) {
          expect(result).toBeInstanceOf(Team);
          expect(result.teamName === c.input).toBeTruthy();
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

        const result = teams.getByTeam(c.input);
        expect(Boolean(result)).toBe(c.expected);

        if (c.expected) {
          expect(result).toBeInstanceOf(Team);
          expect(result.equals(c.input)).toBeTruthy();
        }
      });
    }
  });

  describe("apiRetrieveTeams", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(new Teams([], 43)),
        expected: {
          url: BASE_PATH + "/teams/",
          method: "GET"
        },
        data: {}
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        c.model["apiRetrieveTeams"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toStrictEqual(c.data);
      });
    }
  });
});
