import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const User = ScavengeResource.extend({
  path: "/users",

  constructor: function(data = {}) {
    if (!(this instanceof User)) {
      return new User(...[].slice.call(arguments));
    }

    data = data ? data : {};

    Object.assign(this, data);

    ScavengeResource.call(this);
  },

  apiLogin: ScavengeMethod({
    path: "/login/",
    method: "POST"
  }),

  apiCreateUser: ScavengeMethod({
    path: "/",
    method: "POST"
  }),

  apiUpdateUser: ScavengeMethod({
    path: "/{userID}",
    method: "PATCH"
  }),

  apiDeleteUser: ScavengeMethod({
    path: "/{userID}",
    method: "DELETE"
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

export default User;
