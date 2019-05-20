import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Media = ScavengeResource.extend({
  path: "/teams/{teamID}/media",

  constructor: function(data = {}) {
    if (!(this instanceof Media)) {
      return new Media(...[].slice.call(arguments));
    }

    const { itemID, location, mediaID, teamID, url } = data ? data : {};
    this.data = {
      itemID: itemID,
      location: location,
      mediaID: mediaID,
      teamID: teamID,
      url: url
    };

    ScavengeResource.call(this);
  },

  apiCreateMedia: ScavengeMethod({
    path: "/",
    method: "POST"
  }),

  apiDeleteMedia: ScavengeMethod({
    path: "/{mediaID}",
    method: "DELETE"
  }),

  copy: function() {
    return Object.assign(new Media(), this);
  },

  equals: function(media) {
    if (!(media instanceof Media)) {
      return false;
    }

    if (
      media.teamID === this.teamID &&
      media.itemID === this.itemID &&
      media.mediaID === this.mediaID &&
      media.url === this.url
    ) {
      return true;
    }

    return false;
  }
});

Object.defineProperty(Media.prototype, "itemID", {
  get: function() {
    return this.data.itemID;
  }
});

Object.defineProperty(Media.prototype, "location", {
  get: function() {
    return this.data.location;
  }
});

Object.defineProperty(Media.prototype, "mediaID", {
  get: function() {
    return this.data.mediaID;
  }
});

Object.defineProperty(Media.prototype, "url", {
  get: function() {
    return this.data.url;
  }
});

Object.defineProperty(Media.prototype, "teamID", {
  get: function() {
    return this.data.teamID;
  }
});

export default Media;
