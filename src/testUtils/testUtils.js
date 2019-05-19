import * as _ from "underscore";

const proto = {
  _requests: [],
  recordRequest: function(request) {
    this._requests.push(request);
  },
  get requests() {
    return this._requests;
  },
  lastRequest: function() {
    return this._requests[this._requests.length - 1];
  }
};

export function addTestModel(model) {
  return Object.assign(model, proto);
}

expect.extend({
  toBeDeepEqual(received, expected) {
    const pass = _.isEqual(received, expected);

    if (pass) {
      return {
        message: () =>
          `expected ${JSON.stringify(
            received
          )} to not be equal to ${JSON.stringify(expected)}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${JSON.stringify(received)} to be equal to ${JSON.stringify(
            expected
          )}`,
        pass: false
      };
    }
  }
});
