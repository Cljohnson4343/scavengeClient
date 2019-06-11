import { Invite } from "../../models";
import Container from "../container";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

export function getInvitesFromResponse(data = [], huntID) {
  return new Invites(
    data.map(d => {
      return new Invite(d);
    }),
    huntID
  );
}

const Invites = ScavengeResource.extend({
  path: "/hunts/{huntID}/invitations",

  constructor: function(invites = [], huntID) {
    if (!(this instanceof Invites)) {
      return new Invites(...[].slice.call(arguments));
    }

    this._container = new Container(
      Invite.prototype,
      invites instanceof Array ? invites : []
    );

    this.huntID = huntID ? huntID : 0;

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
    return this.array.map(p => {
      return p.requestJSON;
    });
  }
});

Object.defineProperty(Invites.prototype, "add", {
  value: function(invite) {
    return new Invites(this._container.add(invite), this.huntID);
  }
});

Object.defineProperty(Invites.prototype, "remove", {
  value: function(invite) {
    return new Invites(this._container.remove(invite), this.huntID);
  }
});

Object.defineProperty(Invites.prototype, "copy", {
  value: function() {
    return new Invites(this.array, this.huntID);
  }
});

Invites.prototype.getByEmail = function(email) {
  return this._container.get(x => x.email === email);
};

Invites.prototype.getByID = function(inviteID) {
  return this._container.get(x => x.inviteID === inviteID);
};

export default Invites;
