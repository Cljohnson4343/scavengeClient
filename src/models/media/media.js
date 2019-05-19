import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Media = ScavengeResource.extend({
  path: "/teams/{teamID}/media",

  constructor: function(data = {}) {
    if (!(this instanceof Media)) {
      return new Media(...[].slice.call(arguments));
    }

    const { itemID, location, mediaID, teamID, url } = data ? data : {};

    this.itemID = itemID;
    this.location = location;
    this.mediaID = mediaID;
    this.teamID = teamID;
    this.url = url;

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

export default Media;
