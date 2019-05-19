import Items from "../items";
import Players from "../players";
import Teams from "../teams";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Hunt = ScavengeResource.extend({
  path: "/hunts",

  constructor: function(hunt = {}, huntID) {
    if (!(this instanceof Hunt)) {
      return new Hunt(hunt);
    }

    if (!Boolean(hunt)) {
      hunt = {};
    }

    this.huntID = huntID;

    if (hunt instanceof Hunt) {
      this.name = hunt.name;
      this.maxTeams = hunt.maxTeams;
      this.startTime = hunt.starts;
      this.endDate = hunt.ends;
      this._items = new Items(hunt.items.array);
      this._players = new Players(hunt.players.array);
      this._teams = new Teams(hunt.teams.array);
    } else {
      this.name = hunt.huntName ? hunt.huntName : "";
      this.maxTeams = hunt.maxTeams ? hunt.maxTeams : 1;
      this.startTime = hunt.startDate ? hunt.startDate : new Date();
      this.endDate = hunt.endDate ? hunt.endDate : new Date();
      this._items = hunt.items ? hunt.items : new Items();
      this._players = hunt.players ? hunt.players : new Players();
      this._teams = hunt.teams ? hunt.teams : new Teams();
    }

    ScavengeResource.call(this);
  },

  apiRetrieveHunt: ScavengeMethod({
    path: "/{huntID}",
    method: "GET"
  }),

  apiCreateHunt: ScavengeMethod({
    path: "/",
    method: "POST"
  }),

  apiDeleteHunt: ScavengeMethod({
    path: "/{huntID}",
    method: "DELETE"
  }),

  apiUpdateHunt: ScavengeMethod({
    path: "/{huntID}",
    method: "PATCH"
  })
});

Object.defineProperty(Hunt.prototype, "starts", {
  get: function() {
    return this.startTime;
  }
});

Object.defineProperty(Hunt.prototype, "ends", {
  get: function() {
    return this.endDate;
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
    return this.startTime <= new Date() && this.endDate > new Date();
  }
});

Object.defineProperty(Hunt.prototype, "startsIn", {
  get: function() {
    return new Date() - this.startTime;
  }
});

Object.defineProperty(Hunt.prototype, "endsIn", {
  get: function() {
    return this.endDate - new Date();
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

export default Hunt;
