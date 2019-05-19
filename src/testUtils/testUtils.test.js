import { addTestModel } from "./testUtils";
import { ScavengeResource, Team } from "../models";

describe("TestModel", () => {
  describe("constructor", () => {
    const cases = [
      {
        name: "wraps the argument model",
        model: new Team()
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const result = addTestModel(c.model);

        expect(result).toBeInstanceOf(Team);
        expect(result).toBeInstanceOf(ScavengeResource);
        expect(result.hasOwnProperty("recordRequest")).toBeTruthy();
      });
    }
  });
  describe("requestRecorder saves requests", () => {
    const cases = [
      {
        name: "should record requests",
        model: new Team(),
        data: { id: 43 },
        length: 1
      }
    ];

    for (let c of cases) {
      test(c.name, () => {
        const model = addTestModel(c.model);

        model.recordRequest(c.data);

        expect(model.hasOwnProperty("requests")).toBeTruthy();
        expect(model.requests.length).toStrictEqual(c.length);
      });
    }
  });
});
