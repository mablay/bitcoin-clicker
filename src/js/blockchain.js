const GENESIS_TIME = 1231006505

function randomBinaryString (length) {
  return Array
    .apply(null, { length })
    .map(Function.call, () => Math.random() > 0.5 ? '1' : '0')
    .join('')
}

function zeroPaddedBinaryString (length, zeros) {
  const hash = randomBinaryString(length - 1 - zeros)
  return '1'.concat(hash).padStart(length, '0')
}

function countLeadingZeros (binaryString) {
  for (let n = 0; n < binaryString.length; n++) {
    if (binaryString.charAt(n) !== '0') return n
  }
  return binaryString.length
}

function binaryDifficultyString (length, requiredZeros) {
  return '1'.padStart(requiredZeros + 1, '0').padEnd(length, '0')
}

function hexDifficultyString (length, requiredZeros) {
  return ''.padStart(requiredZeros, '0').padEnd(length, 'F')
}

function expectedNumberOfHashes (requiredZeros) {
  return Math.pow(2, requiredZeros)
}

function blocktime (chainheight) {
  return new Date((1231009380 + chainheight * 600) * 1000)
}

function chainHeight (gameTime) {
  return Math.floor((gameTime - GENESIS_TIME) / 600)
}

// THps
function foreignHashrate (chainheight) {
  // THps = 1e12 Hps
  // return 0.00000005 * Math.exp(chainheight * 0.000063786) * 1e12
  return 50000 * Math.exp(chainheight * 0.000063786)
}

const metricPrefixes = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
const stringifyMetricUnit = (val, unit) => val.toFixed(2).concat(unit)

/**
 * metricUnit(123456, 'T').toString() => '123.46 PH/s'
 * @param value {Number}
 * @param prefix { undefined | k | M | G | T | P | E | Z | Y } metric prefix for parameter value. Default: undefined which ignores the prefix
 */
function metricUnit (value, prefix) {
  const prefixTriDecimal = 1 + metricPrefixes.indexOf(prefix)
  const valueTriDecimal = (value === 0) ? 0 : Math.floor(Math.log10(Math.abs(value)) / 3)
  const triDecimal = prefixTriDecimal + valueTriDecimal
  // val will have 1, 2 or 3 major decimals
  const val = value * Math.pow(10, -valueTriDecimal * 3)
  const unit = (triDecimal < 1) ? '' : metricPrefixes[triDecimal - 1]
  return {
    unit,
    value: val,
    toString () {
      return stringifyMetricUnit(val, unit)
    }
  }
}

export {
  randomBinaryString,
  countLeadingZeros,
  zeroPaddedBinaryString,
  binaryDifficultyString,
  hexDifficultyString,
  expectedNumberOfHashes,
  foreignHashrate,
  metricUnit,
  blocktime,
  chainHeight
}
