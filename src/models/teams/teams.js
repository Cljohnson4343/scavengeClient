import { ScavengeError } from "../../utils";
import { Player, Team } from "../../models";
import Container from "../container";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

export function getTeamsFromResponse(data) {
  return new Teams(data.map(d => new Team(d)));
}

const Teams = ScavengeResource.extend({
  path: "/teams",

  constructor: function(teams = []) {
    if (!(this instanceof Teams)) {
      return new Teams(...[].slice.call(arguments));
    }
    ScavengeResource.call(this);

    this._container = new Container(
      Team.prototype,
      teams instanceof Array ? teams : []
    );
  },

  apiRetrieveTeams: ScavengeMethod({
    path: "/",
    method: "GET"
  })
});

Object.defineProperty(Teams.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Teams.prototype, "length", {
  get: function() {
    return this._container.length;
  }
});

Object.defineProperty(Teams.prototype, "validateTeamName", {
  value: function(maxTeams, name, ignore) {
    if (!name || typeof name !== "string") {
      return new ScavengeError("Must have non-nil name");
    }

    if (this.length >= maxTeams) {
      return new ScavengeError(`Max number of teams is set to ${maxTeams}`);
    }

    let tns = this.array.map(team => team.teamName.toLowerCase());
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
    return new Teams(this._container.add(team));
  }
});

Object.defineProperty(Teams.prototype, "remove", {
  value: function(team) {
    return new Teams(this._container.remove(team));
  }
});

Object.defineProperty(Teams.prototype, "copy", {
  value: function() {
    return new Teams(this.array);
  }
});

Teams.prototype.changeTeamName = function(oldName, newName) {
  return new Teams(
    this.array.map(t => {
      if (t.teamName === oldName) {
        return t.changeName(newName);
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
    this.array.map(t => {
      if (t.equals(team)) {
        return t.addPlayer(player);
      }
      return t.removePlayer(player);
    })
  );
};

Teams.prototype.getByName = function(name) {
  return this._container.get(x => x.teamName === name);
};

Teams.prototype.getByTeam = function(team) {
  if (!(team instanceof Team)) {
    return null;
  }

  return this._container.get(x => x.equals(team));
};

Teams.prototype.changePlayerEmail = function(player, email) {
  return new Teams(
    this.array.map(t => {
      return t.changePlayerEmail(player, email);
    })
  );
};

Object.defineProperty(Teams.prototype, "requestJSON", {
  get: function() {
    return this.array.map(t => t.requestJSON);
  }
});

export default Teams;
