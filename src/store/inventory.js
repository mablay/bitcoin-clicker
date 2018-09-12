import market from '../js/market'

const inventory = {
  state: {
    ...Object.keys(market).reduce((acc, item) => {
      acc[item] = 0
      return acc
    }, {}),
    space: 10,
    btc: 0,
    usd: 100,
    computer: 1 // 100 kH/s
  },
  getters: {
    // Inventory power consumption
    watt: (state) => {
      let watt = 0
      for (let {amount, item} of Object.entries(state)) {
        if (!market[item]) continue
        watt += (market[item].watt || 0) * amount
      }
      return watt
    },
    // Inventory space consumption
    space: (state) => {
      let space = 0
      for (let [item, amount] of Object.entries(state)) {
        const sp = market[item] ? market[item].space || 0 : 0
        // console.log('[store] Inventory item %s', item, sp)
        if (!market[item]) continue
        space += sp * amount
      }
      return space
    }
  },
  mutations: {
    addToInventory: (state, {item, amount}) => (state[item] += amount),
    buy: (state, {item, amount, price}) => {
      state[item] += amount
      state['usd'] -= price
    },
    sell: (state, {item, amount, price}) => state[item]--
  },
  actions: {
    buy ({commit, state}, task) {
      const item = task.context
      this.dispatch('work', task).then(() => {
        const order = {
          item: task.context,
          price: market[item].buyPrice,
          amount: 1
        }
        console.log('[store] buy', task)
        commit('buy', order)
        commit('log', `bought ${order.amount} ${order.item}`)
      })
    }
  }
}

export default inventory
