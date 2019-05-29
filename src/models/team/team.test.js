import { addTestModel } from "../../testUtils";
import Team from "./team";
import { BASE_PATH } from "../../config";

describe("Team", () => {
  describe("apiDeleteTeam", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(
          new Team({ teamName: "name", huntID: 43, teamID: 23 })
        ),
        data: {},
        expected: {
          url: BASE_PATH + "/teams/23",
          method: "DELETE"
        }
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        c.model["apiDeleteTeam"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);
        expect(result.data).toBeDeepEqual(c.data);
      });
    }
  });

  describe("apiCreateTeam", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(
          new Team({ teamName: "name", huntID: 43, teamID: 23 })
        ),
        expected: {
          url: BASE_PATH + "/teams/",
          method: "POST"
        }
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        c.model["apiCreateTeam"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).toInclude("teamName");
        expect(result.data).toInclude("huntID");

        expect(result.data).not.toInclude("teamID");
      });
    }
  });

  describe("apiUpdateTeam", () => {
    const cases = [
      {
        name: "create a valid config for an api method call",
        model: addTestModel(
          new Team({ teamName: "name", huntID: 43, teamID: 23 })
        ),
        expected: {
          url: BASE_PATH + "/teams/23",
          method: "PATCH"
        }
      }
    ];
    for (let c of cases) {
      test(c.name, () => {
        c.model["apiUpdateTeam"]();

        const result = c.model.lastRequest();

        expect(result.url).toStrictEqual(c.expected.url);
        expect(result.method).toStrictEqual(c.expected.method);

        expect(result.data).not.toInclude("teamID");
      });
    }
  });
});
