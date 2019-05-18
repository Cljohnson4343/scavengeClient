import axios from "axios";

export default function ScavengeMethod(config) {
  return function(data) {
    config.data = Object.create(data);
    return axios(config);
  };
}
