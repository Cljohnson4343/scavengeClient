import ScavengeMethod from "../scavengeMethod";
import ScavengeResource from "../scavengeResource";
import { getDataProperties } from "../../utils";

export function getTeamFromResponse(data) {
  return new Team(data);
}

const Team = ScavengeResource.extend({
  path: "/teams",

  constructor: function(data) {
    if (!(this instanceof Team)) {
      return new Team(...[].slice.call(arguments));
    }

    this.data = { ...data };

    ScavengeResource.call(this);
  },

  apiRetrieve: ScavengeMethod({
    path: "/{teamID}",
    method: "GET"
  }),

  apiRetrievePoints: ScavengeMethod({
    path: "/{teamID}/points/",
    method: "GET"
  }),

  apiDeleteTeam: ScavengeMethod({
    path: "/{teamID}",
    method: "DELETE"
  }),

  apiCreateTeam: ScavengeMethod(
    {
      path: "/",
      method: "POST"
    },
    self => getDataProperties(self.data, ["huntID", "teamName"])
  ),

  apiUpdateTeam: ScavengeMethod(
    {
      path: "/{teamID}",
      method: "PATCH"
    },
    self => getDataProperties(self.data, ["teamID", "teamName"])
  )
});

const t = Team.prototype;

Object.defineProperty(t, "teamName", {
  get: function() {
    return this.data.teamName;
  }
});

Object.defineProperty(t, "huntID", {
  get: function() {
    return this.data.huntID;
  }
});

Object.defineProperty(t, "points", {
  get: function() {
    return this.data.points;
  }
});

Object.defineProperty(t, "teamID", {
  get: function() {
    return this.data.teamID;
  }
});

Object.defineProperty(t, "changeName", {
  value: function(name) {
    if (typeof name === "string") {
      return new Team({ ...this.data, ...{ teamName: name } });
    }

    return new Team(this.data);
  }
});

Object.defineProperty(t, "copy", {
  value: function() {
    return new Team(this.data);
  }
});

Object.defineProperty(t, "equals", {
  value: function(obj) {
    if (!(obj instanceof Team)) {
      return false;
    }

    return this.teamID
      ? this.teamID === obj.teamID
      : this.teamName === obj.teamName;
  }
});

Object.defineProperty(t, "requestJSON", {
  get: function() {
    return this.data;
  }
});

export default Team;
