import Container from "../container";
import Location from "../location";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Locations = ScavengeResource.extend({
  path: "/teams/{teamID}/locations",

  constructor: function(locations = [], teamID) {
    if (!(this instanceof Locations)) {
      return new Locations(...[].slice.call(arguments));
    }

    this.teamID = teamID;

    this._container = new Container(
      Location.prototype,
      locations instanceof Array ? locations : []
    );

    ScavengeResource.call(this);
  },

  apiRetrieveLocations: ScavengeMethod({
    path: "/",
    method: "GET"
  }),

  getByID: function(id) {
    return this._container.get(l => l.locationID === id);
  }
});

Object.defineProperty(Locations.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Locations.prototype, "length", {
  get: function() {
    return this._container.length;
  }
});

Object.defineProperty(Locations.prototype, "add", {
  value: function(item) {
    return new Locations(this._container.add(item), this.teamID);
  }
});

Object.defineProperty(Locations.prototype, "remove", {
  value: function(item) {
    return new Locations(this._container.remove(item), this.teamID);
  }
});

export default Locations;
