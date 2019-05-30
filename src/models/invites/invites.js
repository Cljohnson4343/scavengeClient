import { Invite } from "../../models";
import Container from "../container";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Invites = ScavengeResource.extend({
  path: "/hunts/{huntID}/invitations",

  constructor: function(invites = []) {
    if (!(this instanceof Invites)) {
      return new Invites(...[].slice.call(arguments));
    }

    this._container = new Container(
      Invite.prototype,
      invites instanceof Array ? invites : []
    );

    this.huntID = invites.length > 0 ? invites[0].huntID : 0;

    ScavengeResource.call(this);
  },

  apiRetrieve: ScavengeMethod({
    path: "/",
    method: "GET"
  })
});

Object.defineProperty(Invites.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Invites.prototype, "length", {
  get: function() {
    return this._container.length;
  }
});

Object.defineProperty(Invites.prototype, "requestJSON", {
  get: function() {
    return this.array.map(p => p.requestJSON);
  }
});

Object.defineProperty(Invites.prototype, "add", {
  value: function(invite) {
    return new Invites(this._container.add(invite));
  }
});

Object.defineProperty(Invites.prototype, "remove", {
  value: function(invite) {
    return new Invites(this._container.remove(invite));
  }
});

Object.defineProperty(Invites.prototype, "copy", {
  value: function() {
    return new Invites(this.array);
  }
});

Invites.prototype.getByEmail = function(email) {
  return this._container.get(x => x.email === email);
};

Invites.prototype.getByID = function(inviteID) {
  return this._container.get(x => x.inviteID === inviteID);
};

export default Invites;
