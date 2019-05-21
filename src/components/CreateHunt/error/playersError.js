import { inError, msg } from "./error";

export function PlayersError(state) {
  if (!(this instanceof PlayersError)) {
    return new PlayersError(state);
  }

  this._state = {};
}

Object.defineProperty(PlayersError.prototype, "inError", {
  get: function() {
    return inError(this._state);
  }
});

Object.defineProperty(PlayersError.prototype, "msg", {
  get: function() {
    return msg(this._state);
  }
});
