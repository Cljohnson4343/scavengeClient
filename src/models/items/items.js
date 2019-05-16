import Container from "../container";
import Item from "../item";

export default function Items(items = []) {
  if (!(this instanceof Items)) {
    return new Items(items);
  }

  this._container = new Container(
    Item.prototype,
    items instanceof Array ? items : []
  );
}

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
    return new Items(this._container.add(item));
  }
});

Object.defineProperty(Items.prototype, "remove", {
  value: function(item) {
    return new Items(this._container.remove(item));
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
      })
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
      })
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
