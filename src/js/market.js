import { GTIME_DAY as DAY } from './util'

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
    buyDuration: 1 * DAY,
    gpus: 0,
    space: 1,
    watt: 100,
    kHps: 1000 // 1 MHps (80W) - 20 MHps (150W)
  },
  gpu: {
    title: 'GPU',
    tech: { gpuMiner: 1 },
    buyPrice: 600,
    buyDuration: 1 * DAY,
    space: 0,
    watt: 130,
    kHps: 100000 // 100 MHps - 2 GHps @250W
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
    kHps: 100000 // 100 MHps - 200 MHps @15W
  },
  usbAsic: {
    title: 'USB Miner',
    tech: { usbMiner: 1 },
    buyPrice: 35,
    buyDuration: 5 * DAY,
    space: 0,
    watt: 2.5,
    kHps: 100000 // 100 MHps - 3 GHps @2.5W
  },
  asic: {
    title: 'Bitcoin ASIC',
    tech: { asic: 1 },
    buyPrice: 2300,
    buyDuration: 14 * DAY,
    space: 1,
    watt: 1500,
    kHps: 1000000000 // 1 THps - 10 THps @1500W
  }
}

export default market
