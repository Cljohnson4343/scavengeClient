export function Error(msg) {
  if (!(this instanceof Error)) {
    return new Error(msg);
  }

  if (msg && typeof msg === "string") {
    this._msg = msg;
  } else {
    this._msg = null;
  }
}

const e = Error.prototype;

Object.defineProperty(e, "inError", {
  get: function() {
    return Boolean(this._msg);
  }
});

Object.defineProperty(e, "msg", {
  get: function() {
    return this._msg;
  }
});
