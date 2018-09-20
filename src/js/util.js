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

function nonZeroProperties (object) {
  return filterProperties(object, key => object[key])
}

function skipProperties (object, skip) {
  return filterProperties(object, key => skip.indexOf(key) < 0)
}

export {
  filterProperties,
  nonZeroProperties,
  skipProperties,
  GTIME_DAY
}
