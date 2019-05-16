import Player from "../player";

export default function Team(teamName, players) {
  if (!(this instanceof Team)) {
    return new Team(teamName, players);
  }

  this._name = teamName || "";
  this._players = players && players instanceof Array ? players.slice(0) : [];
}

const t = Team.prototype;

Object.defineProperty(t, "name", {
  get: function() {
    return this._name;
  }
});

Object.defineProperty(t, "changeName", {
  value: function(name) {
    if (name && typeof name === "string") {
      return new Team(name, this._players);
    }

    return new Team(null, this._players);
  }
});

Object.defineProperty(t, "players", {
  get: function() {
    return this._players;
  }
});

Object.defineProperty(t, "copy", {
  value: function() {
    return new Team(this._name, this._players);
  }
});

Object.defineProperty(t, "addPlayer", {
  value: function(plr) {
    if (plr instanceof Player) {
      let players = [...this._players, plr];
      return new Team(this._name, players);
    }
    return this.copy();
  }
});

Object.defineProperty(t, "removePlayer", {
  value: function(plr) {
    let players = this._players.filter(player => !player.equals(plr));
    return new Team(this._name, players);
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

    return this._name === obj.name;
  }
});

Object.defineProperty(t, "changePlayerEmail", {
  value: function(player, email) {
    return new Team(
      this._name,
      this._players.map(p => {
        if (p.equals(player)) {
          return p.changeEmail(email);
        }
        p.copy();
      })
    );
  }
});
