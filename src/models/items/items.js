import Container from "../container";
import Item from "../item";
import ScavengeResource from "../scavengeResource";
import ScavengeMethod from "../scavengeMethod";

export function getItemsFromResponse(data) {
  return new Items(data.map(d => new Item(d)));
}

const Items = ScavengeResource.extend({
  path: "/hunts/{huntID}/items",

  constructor: function(items = [], huntID) {
    if (!(this instanceof Items)) {
      return new Items(...[].slice.call(arguments));
    }

    this.data = {
      huntID: huntID
    };

    this._container = new Container(
      Item.prototype,
      items instanceof Array ? items : []
    );

    ScavengeResource.call(this);
  },

  apiRetrieveItems: ScavengeMethod({
    path: "/",
    method: "GET"
  })
});

Object.defineProperty(Items.prototype, "huntID", {
  get: function() {
    return this.data.huntID;
  }
});

Object.defineProperty(Items.prototype, "array", {
  get: function() {
    return this._container.array;
  }
});

Object.defineProperty(Items.prototype, "length", {
  get: function() {
    return this._container.length;
  }
});

Object.defineProperty(Items.prototype, "add", {
  value: function(item) {
    return new Items(this._container.add(item), this.huntID);
  }
});

Object.defineProperty(Items.prototype, "remove", {
  value: function(item) {
    return new Items(this._container.remove(item), this.huntID);
  }
});

Object.defineProperty(Items.prototype, "changeItemName", {
  value: function(item, name) {
    return new Items(
      this.array.map(i => {
        if (i.equals(item)) {
          return i.changeName(name);
        }
        return i.copy();
      }),
      this.huntID
    );
  }
});

Object.defineProperty(Items.prototype, "changeItemPoints", {
  value: function(item, points) {
    return new Items(
      this.array.map(i => {
        if (i.equals(item)) {
          return i.changePoints(points);
        }
        return i.copy();
      }),
      this.huntID
    );
  }
});

Object.defineProperty(Items.prototype, "getByName", {
  value: function(name) {
    return this._container.get(i => i.name === name);
  }
});

Object.defineProperty(Items.prototype, "getByItem", {
  value: function(item) {
    return this._container.get(i => i.equals(item));
  }
});

Object.defineProperty(Items.prototype, "requestJSON", {
  get: function() {
    return this.array.map(i => i.requestJSON);
  }
});

export default Items;
