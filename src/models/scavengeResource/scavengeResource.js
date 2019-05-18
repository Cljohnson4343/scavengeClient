import ScavengeMethod from "../scavengeMethod";
import { extend } from "../../utils";

const DEFAULT_PATH = "http://localhost:4343/api/v0";

export default function ScavengeResource() {
  this.basePath = DEFAULT_PATH;
}

ScavengeResource.method = ScavengeMethod;
ScavengeResource.extend = extend;
