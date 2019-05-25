import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Notification = ScavengeResource.extend({
  path: "/users/{userID}/notifications",
  constructor: function(data, userID) {
    if (!(this instanceof Notification)) {
      return new Notification(...[].slice.call(arguments));
    }

    this.data = Object.assign({}, data);

    ScavengeResource.call(this);
  },

  apiDeleteNotification: ScavengeMethod({
    path: "/{notificationID}",
    method: "DELETE"
  })
});

Object.defineProperty(Notification.prototype, "notificationID", {
  get: function() {
    return this.data.notificationID;
  }
});

Object.defineProperty(Notification.prototype, "userID", {
  get: function() {
    return this.data.userID;
  }
});

Object.defineProperty(Notification.prototype, "inviterID", {
  get: function() {
    return this.data.inviterID;
  }
});

Object.defineProperty(Notification.prototype, "email", {
  get: function() {
    return this.data.email;
  }
});

Object.defineProperty(Notification.prototype, "huntID", {
  get: function() {
    return this.data.huntID;
  }
});

Object.defineProperty(Notification.prototype, "invitedAt", {
  get: function() {
    return this.data.invitedAt;
  }
});

Object.defineProperty(Notification.prototype, "equals", {
  value: function(obj) {
    if (!(obj instanceof Notification)) {
      return false;
    }
    return this.notificationID === obj.notificationID;
  }
});

Object.defineProperty(Notification.prototype, "inviterUsername", {
  get: function() {
    return this.data.inviterUsername;
  }
});

Object.defineProperty(Notification.prototype, "huntName", {
  get: function() {
    return this.data.huntName;
  }
});

Object.defineProperty(Notification.prototype, "copy", {
  value: function() {
    return Object.assign(new Notification(), this.data);
  }
});

Object.defineProperty(Notification.prototype, "requestJSON", {
  get: function() {
    return this.data;
  }
});

export default Notification;
