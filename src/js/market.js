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
    kHps: 10000 // 10 MHps - 100 MHps
  },
  gpu: {
    title: 'GPU',
    tech: { gpuMiner: 1 },
    buyPrice: 600,
    buyDuration: 0.1,
    space: 0,
    watt: 130,
    kHps: 100000 // 100 MHps - 1 GHps
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
  fpga: {
    title: 'FPGA',
    tech: { fpgaMiner: 1 },
    buyPrice: 2000,
    buyDuration: 1,
    space: 1,
    watt: 800,
    kHps: 10000000 // 10 GHps - 100 GHps
  },
  asic: {
    title: 'Bitcoin ASIC',
    tech: { asic: 1 },
    buyPrice: 2300,
    buyDuration: 20,
    space: 1,
    watt: 1500,
    kHps: 1000000000 // 1 THps - 10 THps
  }
}

export default market
