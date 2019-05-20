import Team from "../team";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Player = ScavengeResource.extend({
  path: "/teams/{teamID}/players",
  constructor: function(email, team, teamID, playerID) {
    if (!(this instanceof Player)) {
      return new Player(...[].slice.call(arguments));
    }

    this.data = {
      email: email || "",
      teamID: teamID,
      userID: playerID
    };

    this._team = team && team instanceof Team ? team.copy() : new Team();

    ScavengeResource.call(this);
  },

  apiCreatePlayer: ScavengeMethod({
    path: "/",
    method: "POST"
  }),

  apiDeletePlayer: ScavengeMethod({
    path: "/{userID}",
    method: "DELETE"
  })
});

Object.defineProperty(Player.prototype, "teamID", {
  get: function() {
    return this.data.teamID;
  }
});

Object.defineProperty(Player.prototype, "userID", {
  get: function() {
    return this.data.userID;
  }
});

Object.defineProperty(Player.prototype, "email", {
  get: function() {
    return this.data.email;
  }
});

Object.defineProperty(Player.prototype, "team", {
  get: function() {
    return this._team;
  }
});

Object.defineProperty(Player.prototype, "changeTeam", {
  value: function(newTeam) {
    if (newTeam && newTeam instanceof Team) {
      return new Player(this.email, newTeam, this.teamID, this.playerID);
    }

    return new Player(this.email, new Team(), this.teamID, this.playerID);
  }
});

Object.defineProperty(Player.prototype, "changeEmail", {
  value: function(email) {
    if (email && typeof email === "string") {
      return new Player(email, this._team, this.teamID, this.playerID);
    }

    return this.copy();
  }
});

Object.defineProperty(Player.prototype, "equals", {
  value: function(obj) {
    if (!(obj instanceof Player)) {
      return false;
    }
    return this.email === obj.email;
  }
});

Object.defineProperty(Player.prototype, "copy", {
  value: function() {
    return new Player(this.email, this._team, this.teamID, this.playerID);
  }
});

export default Player;
