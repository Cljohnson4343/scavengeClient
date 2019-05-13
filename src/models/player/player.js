export default function Player(email) {
  this._email = email || "";

  Object.defineProperty(this, "email", {
    get: function() {
      return this._email;
    },
    set: function(str) {
      this._email = str;
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
