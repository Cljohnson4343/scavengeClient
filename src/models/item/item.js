import ScavengeResource from "../scavengeResource";

const Item = ScavengeResource.extend({
  constructor: function(name = "", pts = 1) {
    if (!(this instanceof Item)) {
      return new Item(name, pts);
    }

    this._name = typeof name === "string" ? name : "";
    this._points = typeof pts === "number" ? Math.floor(pts) : 1;

    ScavengeResource.call(this);
  }
});

Object.defineProperty(Item.prototype, "name", {
  get: function() {
    return this._name;
  }
});

Object.defineProperty(Item.prototype, "points", {
  get: function() {
    return this._points;
  }
});

Object.defineProperty(Item.prototype, "changeName", {
  value: function(name) {
    return new Item(typeof name === "string" ? name : this._name, this._points);
  }
});

Object.defineProperty(Item.prototype, "changePoints", {
  value: function(pts) {
    return new Item(
      this._name,
      typeof pts === "number" && pts > 0 ? Math.floor(pts) : 1
    );
  }
});

Object.defineProperty(Item.prototype, "equals", {
  value: function(item) {
    if (!(item instanceof Item)) {
      return false;
    }

    if (this._name === item.name && this._points === item.points) {
      return true;
    }

    return false;
  }
});

Object.defineProperty(Item.prototype, "copy", {
  value: function() {
    return new Item(this._name, this._points);
  }
});

export default Item;
