import { Error } from "../../utils";
import { Player, Team } from "../../models";

export function Teams(teams = []) {
  if (!(this instanceof Teams)) {
    return new Teams(teams);
  }

  this._teams = teams instanceof Array ? [...teams] : [];
}

Object.defineProperty(Teams.prototype, "teams", {
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
      return new Error("Must have non-nil name");
    }

    if (this._teams.length >= maxTeams) {
      return new Error(`Max number of teams is set to ${maxTeams}`);
    }

    let tns = this._teams.map(team => team.name.toLowerCase());
    if (ignore) {
      let lowerIgnore = ignore.toLowerCase();
      tns = tns.filter(ns => ns !== lowerIgnore);
    }

    const nameLower = name.toLowerCase();
    if (tns.includes(nameLower)) {
      return new Error(`${name} is already used.`);
    }
    return new Error();
  }
});

Object.defineProperty(Teams.prototype, "add", {
  value: function(team) {
    if (!(team instanceof Team)) {
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
  if (!(player instanceof Player) || !(team instanceof Team)) {
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
