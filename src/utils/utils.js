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
