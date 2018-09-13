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
    kHps: 100 // 100 kHps
  },
  gpu: {
    title: 'GPU',
    buyPrice: 600,
    buyDuration: 0.1,
    space: 0,
    watt: 130,
    kHps: 20000 // 20 MHps
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
    kHps: 5000000 // 5 GHps
  }
}

export default market
