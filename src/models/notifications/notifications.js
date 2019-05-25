import Container from "../container";
import Notification from "../notification";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Notifications = ScavengeResource.extend({
  path: "/users/{userID}/notifications",

  constructor: function(data, userID) {
    if (!(this instanceof Notifications)) {
      return new Notifications(...[].slice.call(arguments));
    }

    this.data = { userID: userID };

    data = data instanceof Array ? data : [];
    let notifications = data.map(d => new Notification(d));
    this._container = new Container(Notification.prototype, notifications);

    ScavengeResource.call(this);
  },

  apiRetrieveNotifications: ScavengeMethod({
    path: "/",
    method: "GET"
  })
});

Object.defineProperty(Notifications.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Notifications.prototype, "length", {
  get: function() {
    return this._container.length;
  }
});

Object.defineProperty(Notifications.prototype, "add", {
  value: function(item) {
    return new Notifications(this.requestJSON);
  }
});

Object.defineProperty(Notifications.prototype, "remove", {
  value: function(item) {
    return new Notifications(this.requestJSON);
  }
});

Object.defineProperty(Notifications.prototype, "userID", {
  get: function() {
    return this.data.userID;
  }
});

Object.defineProperty(Notifications.prototype, "requestJSON", {
  get: function() {
    return this.array.map(n => n.requestJSON);
  }
});

export default Notifications;
