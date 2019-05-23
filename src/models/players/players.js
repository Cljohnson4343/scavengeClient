import { Player } from "../../models";
import Container from "../container";
import Team from "../team";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

export function getPlayersFromResponse(data) {
  data = data ? data : [];
  return new Players(data.map(d => new Player(d)));
}

const Players = ScavengeResource.extend({
  path: "/teams/{teamID}/players",

  constructor: function(players = [], teamID) {
    if (!(this instanceof Players)) {
      return new Players(...[].slice.call(arguments));
    }

    this.data = {
      teamID: teamID
    };

    this._container = new Container(
      Player.prototype,
      players instanceof Array ? players : []
    );

    ScavengeResource.call(this);
  },

  apiRetrievePlayers: ScavengeMethod({
    path: "/",
    method: "GET"
  })
});

Object.defineProperty(Players.prototype, "teamID", {
  get: function() {
    return this.data.teamID;
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

Players.prototype.changeTeamName = function(oldName, newName) {
  return new Players(
    this.array.map(p => {
      if (p.team.name === oldName) {
        return new Player(p.email, p.team.changeName(newName));
      }
      return p.copy();
    }),
    this.teamID
  );
};

Players.prototype.change = function(player, team) {
  return new Players(
    this.array.map(p => {
      if (p.equals(player)) {
        return p.changeTeam(team);
      }
      return p.copy();
    }),
    this.teamID
  );
};

Players.prototype.getByTeam = function(team) {
  return new Players(this.array.filter(p => p.team.equals(team)), this.teamID);
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

Players.prototype.removeTeam = function(team) {
  return new Players(
    this.array.map(p => {
      if (p.team.equals(team)) {
        return p.changeTeam(new Team());
      }
      return p.copy();
    }),
    this.teamID
  );
};

Players.prototype.changePlayerEmail = function(player, email) {
  return new Players(
    this.array.map(p => {
      if (p.equals(player)) {
        return p.changeEmail(email);
      }
      return p.copy();
    }),
    this.teamID
  );
};

export default Players;
