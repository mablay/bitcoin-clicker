// const fs = require('fs')
// const data = JSON.parse(fs.readFileSync('./src/js/btc_usd.json'))
// console.log(data.length)
//
// const series = []
// for (let i = 0; i < data.length; i += 100) {
//   let av = 0
//   for (let k = i; k < i + 100 && k < data.length; k++) {
//     av += data[k][1]
//   }
//   series.push([data[i + 50][0] / 1000, Math.round(av * 100) / 100])
// }

const series = []
let price = 2
for (let i = 1222369380; i < 1283731200; i += 8640000) {
  series.push([i, price])
  price += 0.6
}

console.log(series)
