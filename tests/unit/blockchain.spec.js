import { metricUnit } from '@/js/blockchain.js'
import { btcPrice } from '@/js/btc-price'

describe('blockchain.js', () => {
  it('estimates networkHashrate based on chain height', () => {
    expect(metricUnit(0).toString()).toEqual('0.00')
    expect(metricUnit(3).toString()).toEqual('3.00')
    expect(metricUnit(-3).toString()).toEqual('-3.00')
    expect(metricUnit(123456).toString()).toEqual('123.46k')
    expect(metricUnit(123456, 'T').toString()).toEqual('123.46P')
    expect(metricUnit(0.12345, 'k').toString()).toEqual('123.45')
  })

  it('interpolates btc price based on chain time', () => {
    const start = 1279411200
    const end = 1537292940
    const step = (end - start) / 10
    for (let i = 0; i < 11; i++) {
      const time = start + i * step
      console.log(`${time} => ${btcPrice(time)}`)
    }
    expect(btcPrice(1288007258)).toBeGreaterThan(0)
  })
})
