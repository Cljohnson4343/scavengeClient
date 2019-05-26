import axios from "axios";

export default function ScavengeLink(linkType) {
  return function(optSpec = {}) {
    console.dir(optSpec);
    const self = this;
    let link = self.links[linkType];

    let path = self.basePath + link.path;
    let data = link.data ? link.data : {};
    data = optSpec.data ? Object.assign({}, data, optSpec.data) : data;

    let config = {
      data: data,
      method: link.method,
      url: path
    };

    if (self.hasOwnProperty("recordRequest")) {
      return self.recordRequest(config);
    }

    return axios(config);
  };
}
