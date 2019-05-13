export default function Player(email, team) {
  this._email = email || "";
  this._team = team ? Object.assign({}, team) : null;

  Object.defineProperty(this, "email", {
    get: function() {
      return this._email;
    },
    set: function(str) {
      this._email = str;
    }
  });

  Object.defineProperty(this, "team", {
    get: function() {
      return this._team;
    },
    set: function(team) {
      this._team = Object.assign({}, team);
    }
  });

  Object.defineProperty(this, "equals", {
    value: function(obj) {
      if (!(obj instanceof Player)) {
        return false;
      }
      return this._email === obj._email;
    }
  });
}
