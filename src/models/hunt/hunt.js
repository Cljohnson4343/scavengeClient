import Items from "../items";
import Players from "../players";
import Teams from "../teams";

export default function Hunt(hunt = {}) {
  if (!(this instanceof Hunt)) {
    return new Hunt(hunt);
  }

  const {
    huntName = "",
    maxTeams = 2,
    startDate = new Date(),
    endDate = new Date(),
    items = new Items(),
    players = new Players(),
    teams = new Teams()
  } = hunt;

  this._huntName = huntName;
  this._maxTeams = maxTeams;
  this._startDate = startDate;
  this._endDate = endDate;
  this._items = items;
  this._players = players;
  this._teams = teams;
}

Object.defineProperty(Hunt.prototype, "name", {
  get: function() {
    return this._huntName;
  }
});

Object.defineProperty(Hunt.prototype, "starts", {
  get: function() {
    return this._startDate;
  }
});

Object.defineProperty(Hunt.prototype, "ends", {
  get: function() {
    return this._endDate;
  }
});

Object.defineProperty(Hunt.prototype, "maxTeams", {
  get: function() {
    return this._maxTeams;
  }
});

Object.defineProperty(Hunt.prototype, "items", {
  get: function() {
    return this._items;
  }
});

Object.defineProperty(Hunt.prototype, "teams", {
  get: function() {
    return this._teams;
  }
});

Object.defineProperty(Hunt.prototype, "players", {
  get: function() {
    return this._players;
  }
});
