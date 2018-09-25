import { GTIME_DAY as DAY } from './util'

/**
 * Things the player can buy or sell
 */
const market = {
  btc: {
    title: 'Bitcoin',
    tech: { NYI: 1 },
    sellPrice: 500,
    sellDuration: 1 * DAY
  },
  computer: {
    title: 'PC',
    buyPrice: 200,
    buyDuration: 1 * DAY,
    gpus: 0,
    space: 1,
    watt: 100,
    hps: 1e6 // 1 MHps (80W) - 20 MHps (150W)
  },
  gpu: {
    title: 'GPU',
    tech: { gpuMiner: 1 },
    buyPrice: 600,
    buyDuration: 1 * DAY,
    space: 0,
    watt: 130,
    hps: 100000 // 100 MHps - 2 GHps @250W
  },
  rig: {
    title: 'Mining RIG',
    tech: { rig: 1 },
    buyPrice: 300,
    buyDuration: 3 * DAY,
    gpus: 0,
    space: 3,
    watt: 80
  },
  fpga: {
    title: 'FPGA',
    tech: { fpgaMiner: 1 },
    buyPrice: 2000,
    buyDuration: 3 * DAY,
    space: 1,
    watt: 800,
    hps: 1e8 // 100 MHps - 200 MHps @15W
  },
  usbAsic: {
    title: 'USB Miner',
    tech: { usbMiner: 1 },
    buyPrice: 35,
    buyDuration: 5 * DAY,
    space: 0,
    watt: 2.5,
    hps: 1e8 // 100 MHps - 3 GHps @2.5W
  },
  asic: {
    title: 'Bitcoin ASIC',
    tech: { asic: 1 },
    buyPrice: 2300,
    buyDuration: 14 * DAY,
    space: 1,
    watt: 1500,
    hps: 1e12 // 1 THps - 10 THps @1500W
  }
}

export default market
