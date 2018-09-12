/**
 * Things the player can buy or sell
 */
const market = {
  computer: {
    title: 'PC',
    buyPrice: 500,
    buyDuration: 0.1,
    gpus: 0,
    space: 1,
    watt: 100,
    kHps: 100 // kilo Hash per second
  },
  rig: {
    title: 'Mining RIG',
    tech: {rig: 1},
    buyPrice: 300,
    buyDuration: 1,
    gpus: 0,
    space: 3,
    watt: 80
  },
  asic: {
    title: 'Bitcoin ASIC',
    tech: {asic: 1},
    buyPrice: 1300,
    buyDuration: 20,
    space: 1,
    watt: 1500,
    kHps: 10000 // kilo Hash per second
  }
}

export default market
