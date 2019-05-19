import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Location = ScavengeResource.extend({
  path: "/teams/{teamID}/locations",

  constructor: function(location) {
    if (!(this instanceof Location)) {
      return new Location(...[].slice.call(arguments));
    }

    const { teamID, locationID, latitude, longitude, timestamp } = location
      ? location
      : {};

    this.teamID = teamID;
    this.locationID = locationID;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timestamp = timestamp;

    ScavengeResource.call(this);
  },

  apiCreateLocation: ScavengeMethod({
    path: "/",
    method: "POST"
  }),

  copy: function() {
    return Object.assign(new Location(), this);
  },

  equals: function(loc) {
    if (!(loc instanceof Location)) {
      return false;
    }

    if (
      loc.teamID === this.teamID &&
      loc.locationID === this.locationID &&
      loc.latitude === this.longitude &&
      loc.longitude === this.longitude &&
      loc.timestamp === this.timestamp
    ) {
      return true;
    }

    return false;
  }
});

export default Location;
