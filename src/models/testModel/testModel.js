import { extend } from "../../utils";

const proto = {
  _requests: [],
  recordRequest: function(request) {
    this._requests.push(request);
  },
  get requests() {
    return this._requests;
  }
};

export default function addTestModel(model) {
  return Object.assign(model, proto);
}
