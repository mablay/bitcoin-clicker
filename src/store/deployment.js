import rentalMarket from '../js/rental-market'
import market from '../js/market'

function inStock (state, property) {
  return Object.keys(state)
    .filter(item => item in market && property in market[item])
}

const deployment = {
  state: {
    // set each miner type to 0 (= none deployed)
    ...inStock(market, 'hps')
      .reduce((acc, item) => ({ ...acc, [item]: 0 }), {})
  },
  getters: {
    deviceTypeHashrate: (state, getters) => {
      return Object.keys(state).reduce((acc, miner) => {
        acc[miner] = state[miner] * market[miner].hps
        return acc
      }, {})
    },
    hashrate: (state, getters) => {
      return Object.keys(state).reduce((sum, miner) => sum + getters.deviceTypeHashrate[miner], 0)
    },
    deployments: (state) => state,
    gpusDeployed: (state, getters, rootState) => state.gpu,
    dailyRental: (state, getters, rootState) =>
      Object.keys(rentalMarket).reduce((sum, housing) => {
        const amount = rootState.inventory[housing]
        const price = rentalMarket[housing].rentalPrice
        return sum + amount * price / 30
      }, 0)
  },
  mutations: {
    deploy: (state, item) => {
      state[item]++
    }
  },
  actions: {
    deploy ({ commit, state }, task) {
      const device = task.context
      console.log('[deploy] action deploy', task)
      this.dispatch('work', task).then(() => {
        commit('deploy', device)
        commit('log', `deployed ${device}`)
      })
    },
    rentSpace ({ commit, state }, task) {
      console.log('[rentSpace]', task)
      const housing = task.context
      this.dispatch('work', task).then(() => {
        console.log('housing', housing)
        commit('addToInventory', { item: housing })
        commit('log', `rented ${housing}`)
      })
    },
    payRent ({ commit, state, getters }, elapsed) {
      commit('addToInventory', { item: 'usd', amount: -getters.dailyRental })
      // console.warn('[payRent] NYI!', getters.dailyRental)
    }
  }
}

export default deployment
