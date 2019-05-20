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

    this.data = {
      teamID: teamID,
      locationID: locationID,
      latitude: latitude,
      longitude: longitude,
      timestamp: timestamp
    };

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

Object.defineProperty(Location.prototype, "locationID", {
  get: function() {
    return this.data.locationID;
  }
});

Object.defineProperty(Location.prototype, "teamID", {
  get: function() {
    return this.data.teamID;
  }
});

Object.defineProperty(Location.prototype, "latitude", {
  get: function() {
    return this.data.latitude;
  }
});

Object.defineProperty(Location.prototype, "longitude", {
  get: function() {
    return this.data.longitude;
  }
});

Object.defineProperty(Location.prototype, "timestamp", {
  get: function() {
    return this.data.timestamp;
  }
});

export default Location;
