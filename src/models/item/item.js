import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

const Item = ScavengeResource.extend({
  path: "/hunts/{huntID}/items",
  constructor: function(name = "", pts = 1, huntID, itemID) {
    if (!(this instanceof Item)) {
      return new Item(name, pts);
    }

    this.name = typeof name === "string" ? name : "";
    this.itemID = itemID;
    this.huntID = huntID;
    this.points = typeof pts === "number" ? Math.floor(pts) : 1;

    ScavengeResource.call(this);
  },

  apiDeleteItem: ScavengeMethod({
    path: "/{itemID}",
    method: "DELETE"
  }),

  apiCreateItem: ScavengeMethod({
    path: "/",
    method: "POST"
  }),

  apiUpdateItem: ScavengeMethod({
    path: "/{itemID}",
    method: "PATCH"
  })
});

Object.defineProperty(Item.prototype, "changeName", {
  value: function(name) {
    return new Item(typeof name === "string" ? name : this.name, this.points);
  }
});

Object.defineProperty(Item.prototype, "changePoints", {
  value: function(pts) {
    return new Item(
      this.name,
      typeof pts === "number" && pts > 0 ? Math.floor(pts) : 1
    );
  }
});

Object.defineProperty(Item.prototype, "equals", {
  value: function(item) {
    if (!(item instanceof Item)) {
      return false;
    }

    if (this.name === item.name && this.points === item.points) {
      return true;
    }

    return false;
  }
});

Object.defineProperty(Item.prototype, "copy", {
  value: function() {
    return new Item(this.name, this.points);
  }
});

export default Item;
