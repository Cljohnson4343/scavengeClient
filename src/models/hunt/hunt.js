import Items from "../items";
import Players from "../players";
import Teams from "../teams";

export default function Hunt(hunt = {}) {
  if (!(this instanceof Hunt)) {
    return new Hunt(hunt);
  }

  if (hunt instanceof Hunt) {
    this._huntName = hunt.name;
    this._maxTeams = hunt.maxTeams;
    this._startDate = hunt.starts;
    this._endDate = hunt.ends;
    this._items = new Items(hunt.items.array);
    this._players = new Players(hunt.players.array);
    this._teams = new Teams(hunt.teams.array);
  } else {
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

Object.defineProperty(Hunt.prototype, "numTeams", {
  get: function() {
    return this.teams.length;
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

Object.defineProperty(Hunt.prototype, "inProgess", {
  get: function() {
    return this._startDate.getTime() <= new Date().getTime();
  }
});

Object.defineProperty(Hunt.prototype, "startsIn", {
  get: function() {
    return new Date() - this._startDate;
  }
});

Object.defineProperty(Hunt.prototype, "endsIn", {
  get: function() {
    return this._endDate - new Date();
  }
});

Object.defineProperty(Hunt.prototype, "equals", {
  value: function(hunt) {
    if (
      this.name === hunt.name &&
      this.starts.getTime() === hunt.starts.getTime() &&
      this.ends.getTime() === hunt.ends.getTime() &&
      this.maxTeams === hunt.maxTeams
    ) {
      return true;
    }
    return false;
  }
});

Object.defineProperty(Hunt.prototype, "copy", {
  value: function() {
    return new Hunt(this);
  }
});
