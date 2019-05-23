import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";
import { deleteProperties, getDataProperties } from "../../utils";

const User = ScavengeResource.extend({
  path: "/users",

  constructor: function(data = {}) {
    if (!(this instanceof User)) {
      return new User(...[].slice.call(arguments));
    }

    this.data = Object.assign({}, data ? data : {});

    ScavengeResource.call(this);
  },

  apiLogin: ScavengeMethod(
    {
      path: "/login/",
      method: "POST"
    },
    self =>
      getDataProperties(self.data, [
        "userID",
        "email",
        "username",
        "firstName",
        "lastName"
      ])
  ),

  apiCreateUser: ScavengeMethod(
    {
      path: "/",
      method: "POST"
    },
    self =>
      getDataProperties(self.data, [
        "username",
        "firstName",
        "lastName",
        "email"
      ])
  ),

  apiUpdateUser: ScavengeMethod(
    {
      path: "/{userID}",
      method: "PATCH"
    },
    self => deleteProperties(self.data, ["userID", "lastVisit", "joinedAt"])
  ),

  apiDeleteUser: ScavengeMethod({
    path: "/{userID}",
    method: "DELETE"
  }),

  apiRetrieveCurrentUser: ScavengeMethod({
    path: "/",
    method: "GET"
  }),

  apiRetrieveUser: ScavengeMethod({
    path: "/{userID}",
    method: "GET"
  }),

  apiLogout: ScavengeMethod({
    path: "/logout/",
    method: "POST"
  }),

  copy: function() {
    return Object.assign(new User(), this);
  },

  equals: function(user) {
    if (!(user instanceof User)) {
      return false;
    }

    const data = this.data;
    const data2 = user.data;

    if (
      data.userID === data2.userID &&
      data.username === data2.username &&
      data.email === data2.email
    ) {
      return true;
    }

    return false;
  }
});

Object.defineProperty(User.prototype, "userID", {
  get: function() {
    return this.data.userID;
  }
});

Object.defineProperty(User.prototype, "username", {
  get: function() {
    return this.data.username;
  }
});

export default User;
