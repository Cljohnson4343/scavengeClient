import { ScavengeError } from "../../../utils";

export function ItemsError(state) {
  if (!(this instanceof ItemsError)) {
    return new ItemsError(state);
  }

  this._state = {
    name: new ScavengeError(),
    points: new ScavengeError()
  };
}

Object.defineProperty(ItemsError.prototype, "inError", {
  get: function() {
    if (this.name.inError || this.points.inError) {
      return true;
    }
    return false;
  }
});

Object.defineProperty(ItemsError.prototype, "msg", {
  get: function() {
    if (this.name.inError) {
      return this.name.msg;
    }
    if (this.points.inError) {
      return this.points.msg;
    }
    return null;
  }
});

Object.defineProperty(ItemsError.prototype, "name", {
  get: function() {
    return this._state.name;
  }
});

Object.defineProperty(ItemsError.prototype, "points", {
  get: function() {
    return this._state.points;
  }
});
