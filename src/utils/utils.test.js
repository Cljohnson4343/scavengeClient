import { extend } from "../utils";
import { pathInterpolator } from "./utils";

describe("extend", () => {
  test("provides a way to extend obj", () => {
    function A() {
      this._base = true;
    }

    A.extend = extend;

    Object.defineProperty(A.prototype, "base", {
      get: function() {
        return this._base;
      }
    });

    const B = A.extend({
      _sub: true
    });

    const result = new B();

    expect(result).toBeInstanceOf(B);
    expect(result).toBeInstanceOf(A);
    expect(result._sub).toBeTruthy();
    expect(result.base).toBeTruthy();
  });
  test("provides a way to extend obj w/ constructor", () => {
    function A() {
      this._base = true;
    }

    A.extend = extend;

    Object.defineProperty(A.prototype, "base", {
      get: function() {
        return this._base;
      }
    });

    const B = A.extend({
      constructor: function() {
        this._sub = true;
        A.call(this);
      }
    });

    const result = new B();

    expect(result).toBeInstanceOf(B);
    expect(result).toBeInstanceOf(A);
    expect(result._sub).toBeTruthy();
    expect(result.base).toBeTruthy();
  });
});

describe("pathInterpolator", () => {
  const cases = [
    {
      name: "handles the one variable case at the end of the path",
      str: "/teams/{teamID}",
      input: {
        teamID: 43,
        locationID: null
      },
      expected: "/teams/43"
    },
    {
      name: "one variable at the beginning of the path",
      str: "/{teamID}",
      input: {
        teamID: 43,
        locationID: null
      },
      expected: "/43"
    },
    {
      name: "one variable in the middle of the path",
      str: "/teams/{teamID}/locations",
      input: {
        teamID: 23,
        locationID: null
      },
      expected: "/teams/23/locations"
    },
    {
      name: "two variable case",
      str: "/teams/{teamID}/locations/{locationID}",
      input: {
        teamID: 23,
        locationID: 43
      },
      expected: "/teams/23/locations/43"
    },
    {
      name: "no variable case with multiple segments",
      str: "/teams/locations/",
      input: {
        teamID: null,
        locationID: null
      },
      expected: "/teams/locations/"
    }
  ];

  for (let c of cases) {
    test(c.name, () => {
      const template = pathInterpolator(c.str);
      expect(template).toBeInstanceOf(Function);

      const result = template(c.input);

      expect(result).toStrictEqual(c.expected);
    });
  }
});
