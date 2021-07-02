function hasOwnProperty(obj, prop) {
  const proto = Object.getPrototypeOf(obj) || obj.constructor.prototype
  return prop in obj && (!(prop in proto) || proto[prop] !== obj[prop])
}

export default hasOwnProperty
