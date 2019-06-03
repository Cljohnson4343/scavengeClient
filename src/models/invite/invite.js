import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";
import { getDataProperties } from "../../utils";

const Invite = ScavengeResource.extend({
  path: "/hunts/{huntID}/invitations",
  constructor: function(data) {
    if (!(this instanceof Invite)) {
      return new Invite(...[].slice.call(arguments));
    }

    this.data = { ...data };

    ScavengeResource.call(this);
  },

  apiCreate: ScavengeMethod(
    {
      path: "/",
      method: "POST"
    },
    self => getDataProperties(self.data, ["email"])
  ),

  apiDelete: ScavengeMethod({
    path: "/{inviteID}",
    method: "DELETE"
  })
});

Object.defineProperty(Invite.prototype, "changeEmail", {
  value: function(email) {
    return new Invite({ ...this.data, ...{ email: email } });
  }
});

Object.defineProperty(Invite.prototype, "email", {
  get: function() {
    return this.data.email;
  }
});

Object.defineProperty(Invite.prototype, "equals", {
  value: function(invite) {
    if (!(invite instanceof Invite)) {
      return false;
    }

    return this.inviteID
      ? this.inviteID === invite.inviteID
      : this.email === invite.email;
  }
});

Object.defineProperty(Invite.prototype, "copy", {
  value: function() {
    return new Invite(this.data);
  }
});

Object.defineProperty(Invite.prototype, "inviteID", {
  get: function() {
    return this.data.notificationID;
  }
});

Object.defineProperty(Invite.prototype, "huntID", {
  get: function() {
    return this.data.huntID;
  }
});

Object.defineProperty(Invite.prototype, "huntName", {
  get: function() {
    return this.data.huntName;
  }
});

Object.defineProperty(Invite.prototype, "inviterID", {
  get: function() {
    return this.data.inviterID;
  }
});

Object.defineProperty(Invite.prototype, "inviterUsername", {
  get: function() {
    return this.data.inviterUsername;
  }
});

Object.defineProperty(Invite.prototype, "invitedAt", {
  get: function() {
    return this.data.invitedAt;
  }
});

Object.defineProperty(Invite.prototype, "userID", {
  get: function() {
    return this.data.userID;
  }
});

Object.defineProperty(Invite.prototype, "requestJSON", {
  get: function() {
    return this.data;
  }
});

export default Invite;
