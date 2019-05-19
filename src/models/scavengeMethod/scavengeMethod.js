import axios from "axios";
import { pathInterpolator } from "../../utils";

export default function ScavengeMethod(config) {
  return function(data) {
    const self = this;

    // add the resource path to the specific endpoint provided by method
    let path = self.path + config.path;

    config.data = Object.create(data);
    config.url = pathInterpolator(path)(self);
    config.baseURL = self.basePath;

    if (self.hasOwnProperty("recordRequest")) {
      return self.recordRequest(config);
    }
    return axios(config);
  };
}
