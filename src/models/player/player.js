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
}

Player.prototype.equals = function(obj) {
  if (!(obj instanceof Player)) {
    return false;
  }

  return this.email === obj.email;
};
