const GTIME_DAY = 86400 // number of seconds in a day

function filterProperties (object, filter) {
  return Object
    .keys(object)
    .filter(filter)
    .reduce((obj, key) => {
      obj[key] = object[key]
      return obj
    }, {})
}

/**
 * Creates a shallow copy of an object
 * omitting all falsy properties.
 * @param  {object} object Source (remains untouched)
 * @return {object} "cropped" shallow copy of source
 */
function nonZeroProperties (object) {
  return filterProperties(object, key => object[key])
}

/**
 * Create a shallow copy of an object,
 * omitting certain properties.
 * @param  {object} object Source (remains untouched)
 * @param  {string[]} skip Array of properties to ommit
 * @return {object} "cropped" shallow copy of source
 */
function skipProperties (object, skip) {
  return filterProperties(object, key => skip.indexOf(key) < 0)
}

export {
  filterProperties,
  nonZeroProperties,
  skipProperties,
  GTIME_DAY
}
