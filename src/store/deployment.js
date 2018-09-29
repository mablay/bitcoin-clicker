import rentalMarket from '../js/rental-market'
import market from '../js/market'

const deployment = {
  state: {
    // set each miner type to 0 (= none deployed)
    ...Object.keys(market)
      .filter(item => 'hps' in market[item])
      .reduce((acc, item) => ({ ...acc, [item]: 0 }), {})
  },
  getters: {
    dailyRental: (state, getters, rootState) =>
      Object.keys(rentalMarket).reduce((sum, housing) => {
        const amount = rootState.inventory[housing]
        const price = rentalMarket[housing].rentalPrice
        return sum + amount * price / 30
      }, 0)
  },
  mutations: {
    deploy: (state, item) => {
      console.warn('[deploy] NYI!', item)
    }
  },
  actions: {
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
