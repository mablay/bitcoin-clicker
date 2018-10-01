import market from '../js/market'
import rentalMarket from '../js/rental-market'

function sumMarketFeature (state, property) {
  return Object.keys(state)
    .filter(item => market[item])
    .reduce((sum, item) => sum + state[item] * (market[item][property] || 0), 0)
}

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
    watt: (state) => sumMarketFeature(state, 'watt'),
    // Total gpu slots
    gpuSlots: (state) => sumMarketFeature(state, 'gpuSlots'),
    // Inventory space consumption
    usedSpace: (state) => sumMarketFeature(state, 'space'),
    // Space provided by rental contracts
    totalSpace: (state) => {
      return Object.keys(rentalMarket)
        .reduce((space, housing) =>
          space + rentalMarket[housing].space * state[housing], 0)
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
