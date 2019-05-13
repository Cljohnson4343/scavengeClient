export default function Team(teamName, players) {
  this._name = teamName || "";
  this._players = players || [];
  Object.defineProperty(this, "name", {
    get: function() {
      return this._name;
    },
    set: function(str) {
      this._name = str;
    }
  });
  Object.defineProperty(this, "players", {
    get: function() {
      return this._players;
    },
    set: function(arr) {
      this._players = arr.slice(0);
    }
  });

  this.addPlayer = function(plr) {
    this.players(this.players.concat(plr));
  };

  this.removePlayer = function(plr) {
    this.players(this.players.filter(player => plr !== player));
  };
}

Team.prototype.equals = function(obj) {
  if (!(obj instanceof Team)) {
    return false;
  }

  return this.name === obj.name;
};
