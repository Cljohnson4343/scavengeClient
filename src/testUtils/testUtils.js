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

export function getRandomEmail() {
  let seconds = new Date().getSeconds();

  return `${randomString(seconds + 2)}@${randomString(8)}.${randomString(4)}`;
}

export function getRandomUsername() {
  let seconds = new Date().getSeconds();

  let length = seconds > 56 ? seconds : seconds + 8;

  return randomString(length);
}

export function randomString(size) {
  let str = "";
  for (let i = 0; i < size; i++) {
    str += randomChar();
  }
  return str;
}

function randomChar() {
  var chars =
    "0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ";
  return chars.substr(Math.floor(Math.random() * 62), 1);
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
  },

  toInclude(received, expected) {
    const pass = received.hasOwnProperty(expected);

    if (pass) {
      return {
        message: () =>
          `expected ${JSON.stringify(
            received
          )} to include property ${expected}`,
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
