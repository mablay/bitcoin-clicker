/**
 * Things the player can buy or sell
 */
const market = {
  btc: {
    title: 'Bitcoin',
    tech: { NYI: 1 },
    sellPrice: 500,
    sellDuration: 10
  },
  computer: {
    title: 'PC',
    buyPrice: 200,
    buyDuration: 0.1,
    gpus: 0,
    space: 1,
    watt: 100,
    kHps: 10000 // 10 MHps
  },
  gpu: {
    title: 'GPU',
    tech: { gpuMiner: 1 },
    buyPrice: 600,
    buyDuration: 0.1,
    space: 0,
    watt: 130,
    kHps: 200000 // 200 MHps
  },
  rig: {
    title: 'Mining RIG',
    tech: { rig: 1 },
    buyPrice: 300,
    buyDuration: 1,
    gpus: 0,
    space: 3,
    watt: 80
  },
  asic: {
    title: 'Bitcoin ASIC',
    tech: { asic: 1 },
    buyPrice: 1300,
    buyDuration: 20,
    space: 1,
    watt: 1500,
    kHps: 5000000 // 5 GHps
  }
}

export default market
