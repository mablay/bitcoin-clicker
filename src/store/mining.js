// import market from '../js/market'
// import { GTIME_DAY as DAY } from '../js/util'
import { chainHeight, foreignHashrate } from '../js/blockchain'
import prefixer from 'si-prefixer'
const metric = (n) => prefixer(n, 'H/s', 3)
const kWhPrice = 0.19

// let lastHour = 0
const mining = {
  state: {
    difficulty: 1,
    chainheight: 250000,
    networkHashrate: 0,
    kWhPrice: kWhPrice,
    joules: 0
  },
  getters: {
    // hashrate: (state, getters, rootState) => {
    //   const miners = Object.keys(market).filter(item => 'hps' in market[item])
    //   const hashrate = miners.reduce((hps, miner) => {
    //     return hps + market[miner].hps * rootState.inventory[miner]
    //   }, 0)
    //   // const str = prefixer(hashrate * 1000)
    //   // console.log('[mining] getters.hashrate: new hashrate %sH/s', str)
    //   return hashrate
    // },
    foreignHashrate: (state, getters, { game }) => foreignHashrate(getters.chainheight),
    networkHashrate: (state, getters) => getters.hashrate + getters.foreignHashrate,
    chainheight: (state, getters, { game }) => chainHeight(game.time),
    hashrateText: (state, { hashrate }) => metric(hashrate),
    dailyUtilityBill: (state, getters) => getters.watt / 1000 * kWhPrice * 24
  },
  mutations: {
    consumeEnergy: (state, joules) => {
      state.joules += joules
    }
  },
  actions: {
    mine: ({ commit, state, getters }, elapsed) => {
      // add coins to inventory according to hashrate
      const blocks = elapsed / 600
      const share = getters.hashrate / getters.networkHashrate
      const reward = 12.5 * share * blocks
      // console.log('[mining] mine', {
      //   network: metric(getters.networkHashrate),
      //   hashrate: metric(getters.hashrate),
      //   share,
      //   supply: 12.5 * blocks,
      //   reward
      // })
      commit('addToInventory', { item: 'btc', amount: reward })

      // energy consumption
      commit('consumeEnergy', getters.watt * elapsed)

      // pay utility bill
      const cost = getters.watt / 1000 * elapsed / 3600 * kWhPrice
      commit('addToInventory', { item: 'usd', amount: -cost })
    }
  }
}

export default mining
