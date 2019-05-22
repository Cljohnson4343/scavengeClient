import Items from "../items";
import Players from "../players";
import Teams from "../teams";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";
import { getDataProperties, deleteProperties } from "../../utils";

const Hunt = ScavengeResource.extend({
  path: "/hunts",

  constructor: function(hunt = {}, huntID) {
    if (!(this instanceof Hunt)) {
      return new Hunt(...[].slice.call(arguments));
    }

    if (!Boolean(hunt)) {
      hunt = {};
    }

    let data = hunt instanceof Hunt ? hunt.data : hunt ? hunt : {};

    this.data = {
      huntID: huntID,
      huntName: data.huntName ? data.huntName : "",
      maxTeams: data.maxTeams ? data.maxTeams : 2,
      startTime: data.startTime ? data.startTime : new Date(),
      endTime: data.endTime ? data.endTime : new Date()
    };

    if (hunt instanceof Hunt) {
      this._items = new Items(hunt.items.array);
      this._players = new Players(hunt.players.array);
      this._teams = new Teams(hunt.teams.array);
    } else {
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

  apiCreateHunt: ScavengeMethod(
    {
      path: "/",
      method: "POST"
    },
    self => {
      let data = getDataProperties(self.data, [
        "huntName",
        "maxTeams",
        "startTime",
        "endTime"
      ]);
      return Object.assign(data, {
        items: self.items.requestJSON,
        teams: self.teams.requestJSON
      });
    }
  ),

  apiDeleteHunt: ScavengeMethod({
    path: "/{huntID}",
    method: "DELETE"
  }),

  apiUpdateHunt: ScavengeMethod(
    {
      path: "/{huntID}",
      method: "PATCH"
    },
    self => deleteProperties(self.data, ["huntID", "createdAt", "creatorID"])
  )
});

Object.defineProperty(Hunt.prototype, "starts", {
  get: function() {
    return this.data.startTime;
  }
});

Object.defineProperty(Hunt.prototype, "ends", {
  get: function() {
    return this.data.endTime;
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
    return this.starts <= new Date() && this.ends > new Date();
  }
});

Object.defineProperty(Hunt.prototype, "startsIn", {
  get: function() {
    return new Date() - this.starts;
  }
});

Object.defineProperty(Hunt.prototype, "endsIn", {
  get: function() {
    return this.ends - new Date();
  }
});

Object.defineProperty(Hunt.prototype, "maxTeams", {
  get: function() {
    return this.data.maxTeams;
  }
});

Object.defineProperty(Hunt.prototype, "huntID", {
  get: function() {
    return this.data.huntID;
  }
});

Object.defineProperty(Hunt.prototype, "name", {
  get: function() {
    return this.data.huntName;
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
    return new Hunt(this, this.huntID);
  }
});

Object.defineProperty(Hunt.prototype, "locationName", {
  get: function() {
    return this.data.locationName;
  }
});

export default Hunt;
