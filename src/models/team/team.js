import Player from "../player";
import ScavengeMethod from "../scavengeMethod";
import ScavengeResource from "../scavengeResource";
import { getDataProperties, deleteProperties } from "../../utils";

export function getTeamFromResponse(data) {
  return new Team(data.teamName, [], data.huntID, data.teamID);
}

const Team = ScavengeResource.extend({
  path: "/teams",

  constructor: function(teamName = "", players = [], huntID, teamID) {
    if (!(this instanceof Team)) {
      return new Team(...[].slice.call(arguments));
    }

    this.data = {
      teamName: teamName,
      huntID: huntID,
      teamID: teamID
    };

    this._players = players && players instanceof Array ? players.slice(0) : [];
    ScavengeResource.call(this);
  },

  apiRetrieve: ScavengeMethod({
    path: "/{teamID}",
    method: "GET"
  }),

  apiRetrievePoints: ScavengeMethod({
    path: "/{teamID}/points/",
    method: "GET"
  }),

  apiDeleteTeam: ScavengeMethod({
    path: "/{teamID}",
    method: "DELETE"
  }),

  apiCreateTeam: ScavengeMethod(
    {
      path: "/",
      method: "POST"
    },
    self => getDataProperties(self.data, ["huntID", "teamName"])
  ),

  apiUpdateTeam: ScavengeMethod(
    {
      path: "/{teamID}",
      method: "PATCH"
    },
    self => deleteProperties(self.data, ["teamID"])
  )
});

const t = Team.prototype;

Object.defineProperty(t, "teamName", {
  get: function() {
    return this.data.teamName;
  }
});

Object.defineProperty(t, "huntID", {
  get: function() {
    return this.data.huntID;
  }
});

Object.defineProperty(t, "teamID", {
  get: function() {
    return this.data.teamID;
  }
});

Object.defineProperty(t, "changeName", {
  value: function(name) {
    if (typeof name === "string") {
      return new Team(name, this._players, this.huntID, this.teamID);
    }

    return new Team(null, this._players, this.huntID, this.teamID);
  }
});

Object.defineProperty(t, "players", {
  get: function() {
    return this._players;
  }
});

Object.defineProperty(t, "copy", {
  value: function() {
    return new Team(this.teamName, this._players, this.huntID, this.teamID);
  }
});

Object.defineProperty(t, "addPlayer", {
  value: function(plr) {
    if (plr instanceof Player) {
      let players = [...this._players, plr];
      return new Team(this.teamName, players, this.huntID, this.teamID);
    }
    return this.copy();
  }
});

Object.defineProperty(t, "removePlayer", {
  value: function(plr) {
    let players = this._players.filter(player => !player.equals(plr));
    return new Team(this.teamName, players, this.huntID, this.teamID);
  }
});

Object.defineProperty(t, "hasPlayer", {
  value: function(plr) {
    let ps = this._players.filter(player => player.equals(plr));
    if (ps && ps.length > 0) {
      return true;
    }
    return false;
  }
});

Object.defineProperty(t, "equals", {
  value: function(obj) {
    if (!(obj instanceof Team)) {
      return false;
    }

    return this.teamName === obj.teamName;
  }
});

Object.defineProperty(t, "changePlayerEmail", {
  value: function(player, email) {
    return new Team(
      this.teamName,
      this._players.map(p => {
        if (p.equals(player)) {
          return p.changeEmail(email);
        }
        return p.copy();
      }),
      this.huntID,
      this.teamID
    );
  }
});

Object.defineProperty(t, "requestJSON", {
  get: function() {
    return this.data;
  }
});

export default Team;
