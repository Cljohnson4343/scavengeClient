import { HuntInfoError } from "./huntInfoError";
import { PlayersError } from "./playersError";
import { TeamsError } from "./teamsError";
import { inError, msg } from "./error";

export function CreateHuntFormError(state) {
  if (!(this instanceof CreateHuntFormError)) {
    return new CreateHuntFormError(state);
  }

  this._state = {
    huntInfo: HuntInfoError(state),
    players: PlayersError(state),
    teams: TeamsError(state)
  };
}

const c = CreateHuntFormError.prototype;

Object.defineProperty(c, "inError", {
  get: function() {
    return inError(this._state);
  }
});

Object.defineProperty(c, "huntInfoError", {
  get: function() {
    return this._state.huntInfo;
  }
});

Object.defineProperty(c, "msg", {
  get: function() {
    return msg(this._state);
  }
});
