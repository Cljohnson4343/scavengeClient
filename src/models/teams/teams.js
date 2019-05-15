import { ScavengeError } from "../../utils";
import { Player, Team } from "../../models";

export function Teams(teams = []) {
  if (!(this instanceof Teams)) {
    return new Teams(teams);
  }

  this._teams = teams instanceof Array ? [...teams] : [];
}

Object.defineProperty(Teams.prototype, "array", {
  get: function() {
    return this._teams;
  }
});

Object.defineProperty(Teams.prototype, "length", {
  get: function() {
    return this._teams.length;
  }
});

Object.defineProperty(Teams.prototype, "validateTeamName", {
  value: function(maxTeams, name, ignore) {
    if (!name || typeof name !== "string") {
      return new ScavengeError("Must have non-nil name");
    }

    if (this._teams.length >= maxTeams) {
      return new ScavengeError(`Max number of teams is set to ${maxTeams}`);
    }

    let tns = this._teams.map(team => team.name.toLowerCase());
    if (ignore) {
      let lowerIgnore = ignore.toLowerCase();
      tns = tns.filter(ns => ns !== lowerIgnore);
    }

    const nameLower = name.toLowerCase();
    if (tns.includes(nameLower)) {
      return new ScavengeError(`${name} is already used.`);
    }
    return new ScavengeError();
  }
});

Object.defineProperty(Teams.prototype, "add", {
  value: function(team) {
    if (!(team instanceof Team) || Boolean(this.getByTeam(team))) {
      return this.copy();
    }

    return new Teams([...this._teams, team]);
  }
});

Object.defineProperty(Teams.prototype, "remove", {
  value: function(team) {
    if (!(team instanceof Team)) {
      return this.copy();
    }

    return new Teams(this._teams.filter(t => !t.equals(team)));
  }
});

Object.defineProperty(Teams.prototype, "copy", {
  value: function() {
    return new Teams(this._teams);
  }
});

Teams.prototype.update = function(oldTeam, newTeam) {
  if (!(oldTeam instanceof Team) || !(newTeam instanceof Team)) {
    return this.copy();
  }

  return new Teams(
    this._teams.map(t => {
      if (t.equals(oldTeam)) {
        return newTeam.copy();
      }
      return t.copy();
    })
  );
};

Teams.prototype.change = function(player, team) {
  if (!(player instanceof Player)) {
    return this.copy();
  }

  return new Teams(
    this._teams.map(t => {
      if (t.equals(team)) {
        return t.addPlayer(player);
      }
      return t.removePlayer(player);
    })
  );
};

Teams.prototype.getByName = function(name) {
  const t = this._teams.filter(x => x.name === name);
  if (t.length > 0) {
    return t[0].copy();
  }
  return null;
};

Teams.prototype.getByTeam = function(team) {
  if (!(team instanceof Team)) {
    return null;
  }

  const t = this._teams.filter(x => x.equals(team));
  if (t.length > 0) {
    return t[0].copy();
  }
  return null;
};
