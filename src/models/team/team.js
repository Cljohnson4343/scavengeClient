import Player from "../player";
import ScavengeMethod from "../scavengeMethod";
import ScavengeResource from "../scavengeResource";

const Team = ScavengeResource.extend({
  path: "/teams",

  constructor: function(teamName = "", players = [], huntID, teamID) {
    if (!(this instanceof Team)) {
      return new Team(...[].slice.call(arguments));
    }

    this.name = teamName || "";
    this.huntID = huntID;
    this.teamID = teamID;
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

  apiCreateTeam: ScavengeMethod({
    path: "/",
    method: "POST"
  }),

  apiUpdateTeam: ScavengeMethod({
    path: "/{teamID}",
    method: "PATCH"
  })
});

const t = Team.prototype;

Object.defineProperty(t, "changeName", {
  value: function(name) {
    if (name && typeof name === "string") {
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
    return new Team(this.name, this._players, this.huntID, this.teamID);
  }
});

Object.defineProperty(t, "addPlayer", {
  value: function(plr) {
    if (plr instanceof Player) {
      let players = [...this._players, plr];
      return new Team(this.name, players, this.huntID, this.teamID);
    }
    return this.copy();
  }
});

Object.defineProperty(t, "removePlayer", {
  value: function(plr) {
    let players = this._players.filter(player => !player.equals(plr));
    return new Team(this.name, players, this.huntID, this.teamID);
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

    return this.name === obj.name;
  }
});

Object.defineProperty(t, "changePlayerEmail", {
  value: function(player, email) {
    return new Team(
      this.name,
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

export default Team;
