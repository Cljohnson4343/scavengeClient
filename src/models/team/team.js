export default function Team(teamName, players) {
  if (!(this instanceof Team)) {
    return new Team(teamName, players);
  }

  this._name = teamName || "";
  this._players = players && players instanceof Array ? players.slice(0) : [];
}

Object.defineProperty(Team.prototype, "name", {
  get: function() {
    return this._name;
  }
});

Object.defineProperty(Team.prototype, "changeName", {
  value: function(name) {
    if (name && typeof name === "string") {
      return new Team(name, this._players);
    }

    return new Team(null, this._players);
  }
});

Object.defineProperty(Team.prototype, "players", {
  get: function() {
    return this._players;
  }
});

Object.defineProperty(Team.prototype, "copy", {
  value: function() {
    return new Team(this._name, this._players);
  }
});

Object.defineProperty(Team.prototype, "addPlayer", {
  value: function(plr) {
    let players = [...this._players, plr];
    return new Team(this._name, players);
  }
});

Object.defineProperty(Team.prototype, "removePlayer", {
  value: function(plr) {
    let players = this._players.filter(player => !player.equals(plr));
    return new Team(this._name, players);
  }
});

Object.defineProperty(Team.prototype, "hasPlayer", {
  value: function(plr) {
    let ps = this._players.filter(player => player.equals(plr));
    if (ps && ps.length > 0) {
      return true;
    }
    return false;
  }
});

Object.defineProperty(Team.prototype, "equals", {
  value: function(obj) {
    if (!(obj instanceof Team)) {
      return false;
    }

    return this._name === obj.name;
  }
});

export function removePlayer(team, plr) {
  return team.players.filter(player => !player.equals(plr));
}

export function addPlayer(team, plr) {
  return team.players.concat(plr);
}
