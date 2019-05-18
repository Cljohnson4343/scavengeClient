import { extend } from "../utils";

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
