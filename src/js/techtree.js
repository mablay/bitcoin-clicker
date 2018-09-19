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
    { title: 'Basic computer skills', duration: 5 },
    { title: 'Advanced computer skills', duration: 50 },
    { title: 'Pro computer skills', duration: 500 }
  ],
  cpuMiner: [
    { title: 'Tweak miner configuration', duration: 5, require: { computer: 1 }, effect: { computer: { kHps: 2 } } },
    { title: 'Overclock CPU', duration: 10, require: { computer: 2 }, effect: { computer: { kHps: 2 } } },
    { title: 'Improve CPU mining algorithm', duration: 20, require: { computer: 3 }, effect: { computer: { kHps: 2 } } },
    { title: 'Rewrite CPU mining software', duration: 50, require: { computer: 3 }, effect: { computer: { kHps: 2 } } }
  ],
  gpuMiner: [
    { title: 'Develop GPU mining', duration: 20 },
    { title: 'Overclock GPU', duration: 30 },
    { title: 'Improve GPU mining algorithm', duration: 40 },
    { title: 'Improve GPU mining algorithm (2)', duration: 50 },
    { title: 'Improve GPU mining algorithm (3)', duration: 70 }
  ].map(tech => ({ ...tech, require: { computer: 3 } })),
  multiGPU: [
    { title: 'Develop multi GPU support - 2x', duration: 20 },
    { title: 'Develop multi GPU support - 3x', duration: 20 },
    { title: 'Develop multi GPU support - 4x', duration: 20 },
    { title: 'Develop multi GPU support - 5x', duration: 20 },
    { title: 'Develop multi GPU support - 6x', duration: 20 }
  ].map(tech => ({ ...tech, require: { gpuMiner: 3 } })),
  rig: [
    { title: 'Invent a GPU RIG', duration: 30 },
    { title: 'Decrease RIG size', duration: 20 },
    { title: 'Improve airflow', duration: 20 }
  ].map(tech => ({ ...tech, require: { multiGPU: 4 } })),
  asic: [
    { title: 'Develop Bitcoin ASIC', duration: 300 },
    { title: 'Improve Bitcoin ASIC', duration: 100 },
    { title: 'Implement ASIC Boost', duration: 100 }
  ].map(tech => ({ ...tech, require: { rig: 3 } }))
}

export default techtree
