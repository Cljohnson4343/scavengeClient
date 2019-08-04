import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";
import { getDataProperties } from "../../utils";

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

  apiCreateMedia: ScavengeMethod(
    {
      path: "/",
      method: "POST"
    },
    self => {
      let data = new FormData();
      let media = {};
      media.itemID = self.data.itemID;
      media.teamID = self.data.teamID;
      media.location = getDataProperties(self.data.location.data, [
        "latitude",
        "longitude",
        "timestamp"
      ]);
      media.location.teamID = self.data.teamID;
      let mediaJSON = JSON.stringify(media, null, 2);
      let mediaBlob = new Blob([mediaJSON], { type: "application/json" });

      data.append("file", self.fileToUpload);
      data.append("json", mediaBlob);

      return data;
    }
  ),

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

const getExt = (s = "") => {
  const ss = s.split(".");
  return ss[ss.length - 1];
};

const vids = ["mp4", "webm"];
const imgs = ["jpeg", "jpg", "gif", "png", "apng", "svg", "bmp"];

Object.defineProperty(Media.prototype, "isImage", {
  get: function() {
    const ext = getExt(this.url);
    return imgs.includes(ext);
  }
});

Object.defineProperty(Media.prototype, "isVideo", {
  get: function() {
    const ext = getExt(this.url);
    return vids.includes(ext);
  }
});

export default Media;
