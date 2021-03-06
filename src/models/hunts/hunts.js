import Container from "../container";
import Hunt from "../hunt";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

export function getHuntsFromResponse(data) {
  let hunts = data.map(d => {
    return new Hunt(
      Object.assign({}, d, {
        startTime: new Date(d.startTime),
        endTime: new Date(d.endTime)
      })
    );
  });
  return new Hunts(hunts);
}

const Hunts = ScavengeResource.extend({
  path: "/hunts",

  constructor: function(hunts) {
    if (!(this instanceof Hunts)) {
      return new Hunts(hunts);
    }

    this._container = new Container(Hunt.prototype, hunts);

    ScavengeResource.call(this);
  },

  apiRetrieveHunts: ScavengeMethod({
    path: "/",
    method: "GET"
  })
});

Object.defineProperty(Hunts.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Hunts.prototype, "length", {
  get: function() {
    return this.array.length;
  }
});

Object.defineProperty(Hunts.prototype, "add", {
  value: function(hunt) {
    return new Hunts(this._container.add(hunt));
  }
});

Object.defineProperty(Hunts.prototype, "remove", {
  value: function(hunt) {
    return new Hunts(this._container.remove(hunt));
  }
});

export default Hunts;
