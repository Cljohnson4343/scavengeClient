export function Error(msg) {
  if (!(this instanceof Error)) {
    return new Error(msg);
  }

  if (msg && typeof msg === "string") {
    this._inError = true;
    this._msg = msg;
  } else {
    this._inError = false;
    this._msg = null;
  }
}

const e = Error.prototype;

Object.defineProperty(e, "inError", {
  get: function() {
    return this._inError;
  }
});

Object.defineProperty(e, "msg", {
  get: function() {
    return this._msg;
  }
});
