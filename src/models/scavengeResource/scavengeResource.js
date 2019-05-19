import { extend, pathInterpolator } from "../../utils";
import ScavengeMethod from "../scavengeMethod";

const DEFAULT_PATH = "http://localhost:4343/api/v0";

ScavengeResource.extend = extend;
ScavengeResource.method = ScavengeMethod;

export default function ScavengeResource(spec = {}) {
  this.basePath = DEFAULT_PATH;
  this.pathInterpolator = pathInterpolator.bind(this);
}
