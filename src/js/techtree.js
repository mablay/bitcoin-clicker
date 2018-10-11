import { GTIME_DAY as DAY } from './util'

/**
 * Array for tech with multiple levels or Object for 1 level
 * duration: (required) techtree duration units are days
 * title: (required) String
 *  to change with the current value. In that case,
 *  max is determined by title.length
 * max: Maximum level for a certain tech. 1 or array.length if undefined.
 * duration: duration in days for tech to be researched
 *
 */
const techtree = {
  computer: [
    { title: 'Basic computer skills', duration: 5 * DAY }, // 5
    { title: 'Advanced computer skills', duration: 10 * DAY }, // 10
    { title: 'Pro computer skills', duration: 20 * DAY } // 20
  ],
  cpuMiner: [
    { title: 'Tweak miner configuration', duration: 5 * DAY, require: { computer: 1 }, effect: { computer: { hps: 2 } } },
    { title: 'Overclock CPU', duration: 10 * DAY, require: { computer: 2 }, effect: { computer: { hps: 2, watt: 1.5 } } },
    { title: 'Improve CPU mining algorithm', duration: 20 * DAY, require: { computer: 3 }, effect: { computer: { hps: 2 } } },
    { title: 'Rewrite CPU miner in assembly', duration: 50 * DAY, effect: { computer: { hps: 2 } } }
  ],
  gpuMiner: [
    { title: 'Develop GPU mining', duration: 20 * DAY, require: { computer: 3 } },
    { title: 'Overclock GPU', duration: 30 * DAY, effect: { gpu: { hps: 2 } } }, // 30
    { title: 'Optimize GPU driver', duration: 40 * DAY, effect: { gpu: { hps: 2 } } }, // 40
    { title: 'Improve GPU mining algorithm', duration: 50 * DAY, effect: { gpu: { hps: 2 } } }, // 50
    { title: 'Improve GPU mining algorithm again', duration: 70 * DAY, effect: { gpu: { hps: 2.5 } } }
  ],
  multiGPU: [
    { title: 'Develop multi GPU support - 2x', duration: 20 * DAY, require: { gpuMiner: 3 }, effect: { computer: { gpuSlots: 2 } } }, // 20
    { title: 'Develop multi GPU support - 5x', duration: 20 * DAY, require: { rig: 1 }, effect: { rig: { gpuSlots: 5 / 3 } } }, // 20
    { title: 'Develop multi GPU support - 7x', duration: 20 * DAY, effect: { rig: { gpuSlots: 7 / 5 } } }, // 20
    { title: 'Develop multi GPU support - 10x', duration: 20 * DAY, effect: { rig: { gpuSlots: 10 / 7 } } } // 20
  ],
  rig: [
    { title: 'Invent a GPU RIG', duration: 30 * DAY, require: { multiGPU: 1 } },
    { title: 'Decrease RIG size', duration: 20 * DAY, effect: { rig: { space: 1 / 3 } } }, // 20
    { title: 'Improve GPU airflow', duration: 20 * DAY, effect: { gpu: { watt: 0.8 } } }
  ],
  fpga: [
    { title: 'Invent FPGA miner', duration: 30 * DAY, require: { rig: 2 } },
    { title: 'Optimize FPGA chip layout', duration: 20 * DAY, effect: { fpga: { hps: 2 } } },
    { title: 'Improve FPGA supply chain', duration: 20 * DAY, effect: { fpga: { buyDuration: 1 / 6 } } }
  ],
  usbMiner: [
    { title: 'Invent USB miner', duration: 30 * DAY, require: { fpga: 2 } },
    { title: 'Increase USB miner hashrate', duration: 20 * DAY, effect: { usbMiner: { hps: 2 } } }
  ],
  asic: [
    { title: 'Develop Bitcoin ASIC', duration: 300 * DAY, require: { usbAsic: 1 } },
    { title: 'Improve Bitcoin ASIC', duration: 100 * DAY },
    { title: 'Implement ASIC Boost', duration: 100 * DAY }
  ]
}

export default techtree
