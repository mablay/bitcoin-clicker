import { metricUnit } from '@/js/blockchain.js'

describe('blockchain.js', () => {
  it('estimates networkHashrate based on chain height', () => {
    expect(metricUnit(0).toString()).toEqual('0.00')
    expect(metricUnit(3).toString()).toEqual('3.00')
    expect(metricUnit(-3).toString()).toEqual('-3.00')
    expect(metricUnit(123456).toString()).toEqual('123.46k')
    expect(metricUnit(123456, 'T').toString()).toEqual('123.46P')
    expect(metricUnit(0.12345, 'k').toString()).toEqual('123.45')
  })
})
