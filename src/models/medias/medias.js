import Container from "../container";
import Media from "../media";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Medias = ScavengeResource.extend({
  path: "/teams/{teamID}/media",

  constructor: function(medias = [], teamID) {
    if (!(this instanceof Medias)) {
      return new Medias(...[].slice.call(arguments));
    }

    this.data = {
      teamID: teamID
    };

    this._container = new Container(
      Media.prototype,
      medias instanceof Array ? medias : []
    );

    ScavengeResource.call(this);
  },

  apiRetrieveMedia: ScavengeMethod({
    path: "/",
    method: "GET"
  }),

  getByID: function(id) {
    return this._container.get(m => m.mediaID === id);
  }
});

Object.defineProperty(Medias.prototype, "teamID", {
  get: function() {
    return this.data.teamID;
  }
});

Object.defineProperty(Medias.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Medias.prototype, "length", {
  get: function() {
    return this._container.length;
  }
});

Object.defineProperty(Medias.prototype, "add", {
  value: function(item) {
    return new Medias(this._container.add(item), this.teamID);
  }
});

Object.defineProperty(Medias.prototype, "remove", {
  value: function(item) {
    return new Medias(this._container.remove(item), this.teamID);
  }
});

Object.defineProperty(Medias.prototype, "getMediaByItemID", {
  value: function(itemID) {
    return this._container.get(m => m.itemID === itemID);
  }
});

export default Medias;
