import market from '../js/market'
import rentalMarket from '../js/rental-market'

const inventory = {
  state: {
    ...Object.keys(market).reduce((acc, item) => {
      acc[item] = 0
      return acc
    }, {}),
    usd: 2000,
    space: 10,
    flat: 1,
    office: 0,
    datacenter: 0,
    btc: 0,
    computer: 0 // 100 kH/s
  },
  getters: {
    // Inventory power consumption
    watt: (state) => {
      let watt = 0
      for (let [item, amount] of Object.entries(state)) {
        if (!market[item]) continue
        watt += (market[item].watt || 0) * amount
      }
      return watt
    },
    totalSpace: (state) => {
      return Object.keys(rentalMarket)
        .reduce((space, housing) =>
          space + rentalMarket[housing].space * state[housing], 0)
      // let space = 0
      // for (const housing of Object.keys(rentalMarket)) {
      //   const sp = rentalMarket[housing].space
      //   const amount = state[housing]
      //   space += sp * amount
      // }
      // return space
    },
    // Inventory space consumption
    usedSpace: (state) => {
      let space = 0
      for (let [item, amount] of Object.entries(state)) {
        const sp = market[item] ? market[item].space || 0 : 0
        // console.log('[store] Inventory item %s', item, sp)
        if (!market[item]) continue
        space += sp * amount
      }
      return space
    },
    // items that suffice their tech requirements
    isAvailable: (state, getters, { technology }) => {
      return Object.keys(market).reduce((acc, item) => {
        const curItem = market[item]
        if (curItem.tech === undefined) {
          // the 'tech' property is optional,
          // item is available per default.
          acc[item] = true
        } else {
          acc[item] = Object.keys(curItem.tech).every(requirement => {
            const level = technology[requirement]
            return level >= curItem.tech[requirement]
          })
        }
        return acc
      }, {})
    },
    // items the player has enough FIAT money to buy
    isAffordable: (state, { usedSpace, totalSpace }) => {
      return Object.keys(market).reduce((acc, item) => {
        acc[item] = (market[item].buyPrice <= state.usd) &&
          (totalSpace >= usedSpace + (market[item].space || 0))
        return acc
      }, {})
    }
  },
  mutations: {
    addToInventory: (state, { item, amount = 1 }) => (state[item] += amount),
    buy: (state, { item, amount, price }) => {
      state[item] += amount
      state['usd'] -= price
    },
    sell: (state, { item, amount, price }) => {
      state[item] -= amount
      state['usd'] += price * amount
    }
  },
  actions: {
    buy ({ commit, state }, task) {
      const item = task.context
      this.dispatch('work', task).then(() => {
        const order = {
          item: task.context,
          price: market[item].buyPrice,
          amount: 1
        }
        // console.log('[store] buy', task)
        commit('buy', order)
        commit('log', `bought ${order.amount} ${order.item}`)
      })
    },
    sell ({ commit, state, getters }, task) {
      // console.log('sell', task)
      const item = task.context
      this.dispatch('work', task).then(() => {
        const order = {
          item: task.context,
          price: market[item].sellPrice,
          amount: state.btc
        }
        if (order.item === 'btc') {
          order.price = getters.btcInUSD
        }
        // console.log('[store] buy', task)
        commit('sell', order)
        commit('log', `sold ${order.amount.toFixed(4)} ${order.item.toUpperCase()} for $${(order.price * order.amount).toFixed(2)} USD`)
      })
    }
  }
}

export default inventory
