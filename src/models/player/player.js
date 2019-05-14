import Team from "../team";

export default function Player(email, team) {
  if (!(this instanceof Player)) {
    return new Player(email, team);
  }

  this._email = email || "";
  this._team = team && team instanceof Team ? team.copy() : null;
}

Object.defineProperty(Player.prototype, "email", {
  get: function() {
    return this._email;
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
      return new Player(this._email, newTeam);
    }

    return new Player(this._email, null);
  }
});

Object.defineProperty(Player.prototype, "changeEmail", {
  value: function(email) {
    if (email && typeof email === "string") {
      return new Player(email, this._team);
    }

    return this.copy();
  }
});

Object.defineProperty(Player.prototype, "equals", {
  value: function(obj) {
    if (!(obj instanceof Player)) {
      return false;
    }
    return this._email === obj._email;
  }
});

Object.defineProperty(Player.prototype, "copy", {
  value: function() {
    return new Player(this._email, this._team);
  }
});
