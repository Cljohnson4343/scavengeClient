import { inError, msg } from "./error";

export function TeamsError(state) {
  if (!(this instanceof TeamsError)) {
    return new TeamsError(state);
  }

  this._state = {};
}

Object.defineProperty(TeamsError.prototype, "inError", {
  get: function() {
    return inError(this._state);
  }
});

Object.defineProperty(TeamsError.prototype, "msg", {
  get: function() {
    return msg(this._state);
  }
});
