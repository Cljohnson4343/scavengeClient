const proto = {
  _requests: [],
  recordRequest: function(request) {
    this._requests.push(request);
  },
  get requests() {
    return this._requests;
  },
  lastRequest: function() {
    return this._requests[this._requests.length - 1];
  }
};

export default function addTestModel(model) {
  return Object.assign(model, proto);
}
