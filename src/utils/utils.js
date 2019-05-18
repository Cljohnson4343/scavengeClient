import { ScavengeError } from "./error";

export function extend(sub) {
  const Super = this;
  const Constructor = sub.hasOwnProperty("constructor")
    ? sub.constructor
    : function(...args) {
        Super.apply(this, args);
      };

  Object.assign(Constructor, Super);
  Constructor.prototype = Object.create(Super.prototype);
  Object.assign(Constructor.prototype, sub);

  return Constructor;
}

/* 
  Generates a function that replaces variable values in a path.
  For example:
    let fn = pathInterpolator(`/teams/{teamID}/locations/{locationID}`);
    let path = fn(43, 3); // returns `/teams/43/locations/3`
*/
export function pathInterpolator(str) {
  let re = /\{(\w+)\}/g;
  let matches = [];
  let match;

  while ((match = re.exec(str)) !== null) {
    matches.push(match);
  }

  return function() {
    let args = [].slice.call(arguments);

    if (matches.length !== args.length) {
      throw new Error(
        `pathInterpolator expected ${matches.length} but got ${args.length}`
      );
    }

    return matches.reduce(
      (acc, v, i) => (acc = acc.replace(v[0], String(args[i]))),
      str
    );
  };
}
