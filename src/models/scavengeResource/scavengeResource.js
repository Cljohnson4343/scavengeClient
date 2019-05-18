import { extend } from "../../utils";

const DEFAULT_PATH = "http://localhost:4343/api/v0";

ScavengeResource.extend = extend;

export default function ScavengeResource(spec = {}) {
  this.basePath = DEFAULT_PATH;
}
