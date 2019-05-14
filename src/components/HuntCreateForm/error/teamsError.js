import { inError, msg } from "./error";
import { Error } from "../../../utils";

export function TeamsError(state) {
  if (!(this instanceof TeamsError)) {
    return new TeamsError(state);
  }

  let err =
    state.maxTeams < state.teams.length
      ? "More teams than the maximum number of teams"
      : null;
  this._state = new Error(err);
}

Object.defineProperty(TeamsError.prototype, "inError", {
  get: function() {
    return this._state.inError;
  }
});

Object.defineProperty(TeamsError.prototype, "msg", {
  get: function() {
    return this._state.msg;
  }
});
