import axios from "axios";
import { pathInterpolator } from "../../utils";

export default function ScavengeMethod(config) {
  return function(data) {
    const self = this;

    let path = self.path + config.path;
    const fullPath = self.basePath + self.pathInterpolator(path);

    config.data = Object.create(data);
    return axios(config);
  };
}
