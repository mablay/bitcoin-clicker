const start = 1279411200
const end = 1537292940
// averaged USD per BTC prices from
// 1279411200 to 1537292940
const prices = [
  0.13,
  0.72,
  8.2,
  29.6,
  10.94,
  7.11,
  6.5,
  13.5,
  13.7,
  230,
  154.2,
  200.62,
  1147.25,
  703.57,
  665.73,
  513.47,
  376.04,
  290.38,
  309.98,
  465.5,
  453.37,
  768.24,
  742.46,
  1129.87,
  2055.62,
  4648.13,
  16858.02,
  19343.04,
  9826.6,
  8397.63
]

const step = end - start / (prices.length - 1)
function interpolate (time) {
  const offset = time - start
  const index = Math.floor(offset / step)
  const q = offset / step - index
  const p = 1 - q
  const priceA = prices[index]
  const priceB = prices[index + 1]
  return priceA * p + priceB * q
}

function btcPrice (time) {
  if (time < start) {
    return prices[0]
  } else if (time > end) {
    return prices[prices.length - 1] + (time - end) / 2500
  } else {
    return interpolate(time)
  }
}

module.exports = btcPrice
