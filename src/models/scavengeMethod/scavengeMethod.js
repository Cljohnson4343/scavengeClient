import axios from "axios";
import { pathInterpolator } from "../../utils";
import http from "http";

axios.defaults.httpAgent = new http.Agent({ keepAlive: true });
axios.defaults.withCredentials = true;

export default function ScavengeMethod(config, getData) {
  return function(params) {
    const self = this;

    let data = getData ? getData(self) : {};

    // add the resource path to the specific endpoint provided by method
    let path = self.path + config.path;

    let spec = Object.assign({}, config, {
      data: data,
      params: params,
      url: self.basePath + pathInterpolator(path)(self)
    });

    if (self.hasOwnProperty("recordRequest")) {
      return self.recordRequest(spec);
    }

    return axios(spec);
  };
}
