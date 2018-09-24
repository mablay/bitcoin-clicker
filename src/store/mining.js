import market from '../js/market'
import { metricUnit, chainHeight } from '../js/blockchain'
// import btcPrice from '../js/btc-price'

// let lastHour = 0
const mining = {
  state: {
    difficulty: 1,
    chainheight: 250000,
    networkHashrate: 0,
    kWhPrice: 0.19,
    utilityBill: 0
  },
  getters: {
    hashrate: (state, getters, rootState) => {
      const miners = Object.keys(market).filter(item => 'kHps' in market[item])
      const hashrate = miners.reduce((kHps, miner) => {
        return kHps + market[miner].kHps * rootState.inventory[miner]
      }, 0)
      // const str = metricUnit(hashrate, 'k').toString()
      // console.log('[mining] getters.hashrate: new hashrate %sH/s', str)
      return hashrate
    },
    foreignHashrate: (state, getters, { game }) => game.time,
    networkHashrate: (state, getters) => getters.hashrate + getters.foreignHashrate,
    chainheight: (state, getters, { game }) => chainHeight(game.time),
    hashrateText: (state, { hashrate }) => metricUnit(hashrate, 'k').toString()
  },
  mutations: {
    eMeter: (state, kJoules) => {
      state.utilityBill += kJoules * state.kWhPrice
    }
  },
  actions: {
    miningReward: ({ commit, state, getters }, elapsed) => {
      // add coins to inventory according to hashrate
      const blocks = elapsed / 600
      const share = getters.hashrate / getters.networkHashrate
      const reward = 12.5 * share * blocks
      console.log('[mining] Nework hashrate %f', reward)
      commit('addToInventory', { item: 'btc', amount: reward })
    }
  }
}

export default mining
