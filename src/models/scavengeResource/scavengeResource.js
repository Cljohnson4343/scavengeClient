import { extend, pathInterpolator } from "../../utils";
import ScavengeMethod from "../scavengeMethod";
import { BASE_PATH } from "../../config";

ScavengeResource.extend = extend;
ScavengeResource.method = ScavengeMethod;

export default function ScavengeResource(spec = {}) {
  this.basePath = BASE_PATH;
  this.pathInterpolator = pathInterpolator.bind(this);
}
