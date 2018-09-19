import market from '../js/market'
import { blocktime, networkHashrate, metricUnit } from '../js/blockchain'
import btcPrice from '../js/btc-price'

let lastHour = 0
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
    hashrateText: (state, { hashrate }) => metricUnit(hashrate, 'k').toString()
  },
  mutations: {
    // grow the chain length by one block
    incrementChainstate: (state) => {
      state.chainheight++
      const nhr = networkHashrate(state.chainheight)
      // console.log('network hashrate', metricUnit(nhr, 'T').toString())
      // TODO networkHashrate = userHashrate + othersHashrate
      state.networkHashrate = metricUnit(nhr, 'T').toString()
    },
    eMeter: (state, kJoules) => {
      state.utilityBill += kJoules * state.kWhPrice
    }
  },
  actions: {
    block ({ commit, state, getters }, n) {
      commit('incrementChainstate')
      const nhr = networkHashrate(state.chainheight) * 1000 * 1000 * 1000
      const ratio = getters.hashrate / nhr
      const btc = 50 * ratio
      // console.log('[game] nhr %s hashrate', nhr, getters.hashrate)
      commit('addToInventory', { item: 'btc', amount: btc })

      // implicit second timer (triggers per hour)
      const chainTime = blocktime(state.chainheight)
      if (chainTime.getHours() !== lastHour) {
        // electricity
        // accumulate electricity costs
        commit('eMeter', getters.watt / 1000)

        // exchange rates
        commit('updateBtcPrice', btcPrice(chainTime.getTime() / 1000))
        lastHour = chainTime.getHours()
      }
    }
  }
}

export default mining
