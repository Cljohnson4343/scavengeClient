export function ScavengeError(msg) {
  if (!(this instanceof ScavengeError)) {
    return new ScavengeError(msg);
  }

  if (msg && typeof msg === "string") {
    this._msg = msg;
  } else {
    this._msg = null;
  }
}

const e = ScavengeError.prototype;

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
