import {
  validateEndDate,
  validateHuntName,
  validateMaxTeams,
  validateStartDate
} from "../../../utils";
import { inError, msg } from "./error";

export function HuntInfoError(state, teams) {
  if (!(this instanceof HuntInfoError)) {
    return new HuntInfoError(state, teams);
  }

  this._state = {
    huntName: validateHuntName(state.huntName),
    maxTeams: validateMaxTeams(state.maxTeams, teams.length),
    startDate: validateStartDate(state.startDate),
    endDate: validateEndDate(state.startDate, state.endDate)
  };
}

Object.defineProperty(HuntInfoError.prototype, "inError", {
  get: function() {
    return inError(this._state);
  }
});

Object.defineProperty(HuntInfoError.prototype, "maxTeams", {
  get: function() {
    return this._state.maxTeams;
  }
});

Object.defineProperty(HuntInfoError.prototype, "startDate", {
  get: function() {
    return this._state.startDate;
  }
});

Object.defineProperty(HuntInfoError.prototype, "endDate", {
  get: function() {
    return this._state.endDate;
  }
});

Object.defineProperty(HuntInfoError.prototype, "huntName", {
  get: function() {
    return this._state.huntName;
  }
});

Object.defineProperty(HuntInfoError.prototype, "msg", {
  get: function() {
    return msg(this._state);
  }
});
