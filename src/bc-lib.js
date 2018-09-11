function randomBinaryString (length) {
  return Array
    .apply(null, {length})
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

export {
  randomBinaryString,
  countLeadingZeros,
  zeroPaddedBinaryString,
  binaryDifficultyString,
  hexDifficultyString,
  expectedNumberOfHashes
}
