import { Player, getPlayerFromResponse } from "../../models";
import Container from "../container";
import Team from "../team";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

export function getPlayersFromResponse(data) {
  console.log("getPlayersFromResponse");
  console.dir(data);
  data = data ? data : [];
  return new Players(data.map(d => getPlayerFromResponse(d)));
}

const Players = ScavengeResource.extend({
  path: "/teams/{teamID}/players",

  constructor: function(players = []) {
    if (!(this instanceof Players)) {
      return new Players(...[].slice.call(arguments));
    }

    this._container = new Container(
      Player.prototype,
      players instanceof Array ? players : []
    );

    ScavengeResource.call(this);
  }
  /*
  apiRetrievePlayers: ScavengeMethod({
    path: "/",
    method: "GET"
  })
  */
});

Object.defineProperty(Players.prototype, "username", {
  get: function() {
    return this.data.username;
  }
});

Object.defineProperty(Players.prototype, "setPlayers", {
  value: function(players) {
    return new Players(players.copy(), this.teamID);
  }
});

Object.defineProperty(Players.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Players.prototype, "length", {
  get: function() {
    return this._container.length;
  }
});

Object.defineProperty(Players.prototype, "requestJSON", {
  get: function() {
    return this.array.map(p => p.requestJSON);
  }
});

Object.defineProperty(Players.prototype, "add", {
  value: function(player) {
    return new Players(this._container.add(player), this.teamID);
  }
});

Object.defineProperty(Players.prototype, "remove", {
  value: function(player) {
    return new Players(this._container.remove(player), this.teamID);
  }
});

Object.defineProperty(Players.prototype, "copy", {
  value: function() {
    return new Players(this.array, this.teamID);
  }
});

Players.prototype.getByTeamID = function(teamID) {
  return new Players(this.array.filter(p => p.teamID === teamID));
};

Players.prototype.getByEmail = function(email) {
  return this._container.get(x => x.email === email);
};

Players.prototype.getByPlayer = function(player) {
  if (!(player instanceof Player)) {
    return null;
  }

  return this._container.get(x => x.equals(player));
};

Players.prototype.removeTeam = function(teamID) {
  return new Players(
    this.array.map(p => {
      if (p.teamID === teamID) {
        return p.changeTeam(0);
      }
      return p.copy();
    })
  );
};

Players.prototype.changePlayersTeam = function(player, teamID) {
  return new Players(
    this.array.map(p => {
      if (p.equals(player)) {
        return p.changeTeam(teamID);
      }
      return p.copy();
    })
  );
};

Players.prototype.changePlayerEmail = function(player, email) {
  return new Players(
    this.array.map(p => {
      if (p.equals(player)) {
        return p.changeEmail(email);
      }
      return p.copy();
    })
  );
};

export default Players;
