import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";
import { getDataProperties } from "../../utils";

// TODO Player model needs to be reworked. Def remove team field. Should be composed of a user model
export function getPlayerFromResponse(data) {
  return new Player(data);
}

const Player = ScavengeResource.extend({
  path: "/hunts/{huntID}/players",
  constructor: function(data) {
    if (!(this instanceof Player)) {
      return new Player(...[].slice.call(arguments));
    }

    this.data = { ...data };

    ScavengeResource.call(this);
  },

  apiCreatePlayer: ScavengeMethod(
    {
      path: "/",
      method: "POST"
    },
    self => getDataProperties(self.data, ["userID"])
  ),

  apiDeletePlayer: ScavengeMethod({
    path: "/{userID}",
    method: "DELETE"
  })
});

Object.defineProperty(Player.prototype, "huntID", {
  get: function() {
    return this.data.huntID;
  }
});

Object.defineProperty(Player.prototype, "teamID", {
  get: function() {
    return this.data.teamID;
  }
});

Object.defineProperty(Player.prototype, "username", {
  get: function() {
    return this.data.username;
  }
});

Object.defineProperty(Player.prototype, "userID", {
  get: function() {
    return this.data.userID;
  }
});

Object.defineProperty(Player.prototype, "email", {
  get: function() {
    return this.data.email;
  }
});

Object.defineProperty(Player.prototype, "changeEmail", {
  value: function(email) {
    if (email && typeof email === "string") {
      return new Player({ ...this.data, ...{ email: email } });
    }

    return this.copy();
  }
});

Object.defineProperty(Player.prototype, "changeTeam", {
  value: function(teamID) {
    if (typeof teamID === "number") {
      return new Player({ ...this.data, ...{ teamID: teamID } });
    }

    return this.copy();
  }
});

Object.defineProperty(Player.prototype, "equals", {
  value: function(obj) {
    if (!(obj instanceof Player)) {
      return false;
    }
    return this.userID ? this.userID === obj.userID : this.email === obj.email;
  }
});

Object.defineProperty(Player.prototype, "copy", {
  value: function() {
    return new Player(this.data);
  }
});

Object.defineProperty(Player.prototype, "requestJSON", {
  get: function() {
    return this.data;
  }
});

export default Player;
