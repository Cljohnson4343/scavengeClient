export default function Container(elementPrototype, list) {
  if (!(this instanceof Container)) {
    return new Container(list);
  }

  if (!elementPrototype.hasOwnProperty("equals")) {
    throw new Error(
      `Element ${elementPrototype} does not implement element.equals(element1) boolean`
    );
  }

  if (!elementPrototype.hasOwnProperty("copy")) {
    throw new Error(
      `Element ${elementPrototype} does not implement element.copy()`
    );
  }

  this._list = list instanceof Array ? [...list] : [];
  this._elementProto = elementPrototype;
}

const proto = Container.prototype;

Object.defineProperty(proto, "array", {
  get: function() {
    return [...this._list];
  }
});

Object.defineProperty(proto, "length", {
  get: function() {
    return this._list.length;
  }
});

Object.defineProperty(proto, "includes", {
  value: function(element) {
    return this._list.filter(x => x.equals(element)).length > 0;
  }
});

Object.defineProperty(proto, "hasElementType", {
  value: function(element) {
    return this._elementProto.isPrototypeOf(element);
  }
});

proto.add = function(element) {
  if (!this.hasElementType(element) || this.includes(element)) {
    return [...this._list];
  }

  return [...this._list, element];
};

proto.remove = function(element) {
  if (!this.hasElementType(element)) {
    return [...this._list];
  }
  return this._list.filter(x => !x.equals(element));
};

proto.update = function(oldEl, newEl) {
  if (!this.hasElementType(oldEl) || !this.hasElementType(newEl)) {
    return [...this._list];
  }

  return this._list.map(x => {
    if (x.equals(oldEl)) {
      return newEl.copy();
    }
    return x.copy();
  });
};

proto.get = function(pred) {
  return this._list.find(pred);
};
