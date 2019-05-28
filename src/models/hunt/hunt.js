import Items, { getItemsFromResponse } from "../items";
import Players, { getPlayersFromResponse } from "../players";
import Teams, { getTeamsFromResponse } from "../teams";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";
import { getDataProperties, deleteProperties } from "../../utils";

export function getHuntFromResponse(data) {}

const Hunt = ScavengeResource.extend({
  path: "/hunts",

  constructor: function(hunt) {
    if (!(this instanceof Hunt)) {
      return new Hunt(...[].slice.call(arguments));
    }

    hunt = Boolean(hunt) ? hunt : {};

    this.data = Object.assign({}, hunt);

    if (!(hunt.items instanceof Items)) {
      this.data.items = getItemsFromResponse(hunt.items);
    } else {
      this.data.items = hunt.items.copy();
    }
    if (!(hunt.teams instanceof Teams)) {
      this.data.teams = getTeamsFromResponse(hunt.teams);
    } else {
      this.data.teams = hunt.teams.copy();
    }
    if (!(hunt.players instanceof Players)) {
      this.data.players = getPlayersFromResponse(hunt.players);
    } else {
      this.data.players = hunt.players.copy();
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
        players: self.players.requestJSON,
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
    return this.data.items;
  }
});

Object.defineProperty(Hunt.prototype, "teams", {
  get: function() {
    return this.data.teams;
  }
});

Object.defineProperty(Hunt.prototype, "players", {
  get: function() {
    return this.data.players;
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
    return Object.assign(new Hunt(), this);
  }
});

Object.defineProperty(Hunt.prototype, "locationName", {
  get: function() {
    return this.data.locationName;
  }
});

Object.defineProperty(Hunt.prototype, "creatorUsername", {
  get: function() {
    return this.data.creatorUsername;
  }
});

export default Hunt;
