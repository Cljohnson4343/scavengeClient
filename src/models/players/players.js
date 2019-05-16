import { Player } from "../../models";
import Container from "../container";
import Team from "../team";

export default function Players(players = []) {
  if (!(this instanceof Players)) {
    return new Players(players);
  }

  this._container = new Container(
    Player.prototype,
    players instanceof Array ? players : []
  );
}

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
    return new Players(this._container.add(player));
  }
});

Object.defineProperty(Players.prototype, "remove", {
  value: function(player) {
    return new Players(this._container.remove(player));
  }
});

Object.defineProperty(Players.prototype, "copy", {
  value: function() {
    return new Players(this.array);
  }
});

Players.prototype.changeTeamName = function(oldName, newName) {
  return new Players(
    this.array.map(p => {
      if (p.team.name === oldName) {
        return new Player(p.email, p.team.changeName(newName));
      }
      return p.copy();
    })
  );
};

Players.prototype.change = function(player, team) {
  return new Players(
    this.array.map(p => {
      if (p.equals(player)) {
        return p.changeTeam(team);
      }
      return p.copy();
    })
  );
};

Players.prototype.getByTeam = function(team) {
  return new Players(this.array.filter(p => p.team.equals(team)));
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
    })
  );
};
