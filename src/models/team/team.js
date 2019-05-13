export default function Team(teamName, players) {
  this._name = teamName || "";
  this._players = players ? players.slice(0) : [];

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

  Object.defineProperty(this, "addPlayer", {
    value: function(plr) {
      this._players = this._players.concat(plr);
    }
  });

  Object.defineProperty(this, "removePlayer", {
    value: function(plr) {
      this._players = this._players.filter(player => !player.equals(plr));
    }
  });

  Object.defineProperty(this, "hasPlayer", {
    value: function(plr) {
      let ps = this._players.filter(player => player.equals(plr));
      if (ps && ps.length > 0) {
        return true;
      }
      return false;
    }
  });

  Object.defineProperty(this, "equals", {
    value: function(obj) {
      if (!(obj instanceof Team)) {
        return false;
      }

      return this._name === obj.name;
    }
  });
}
