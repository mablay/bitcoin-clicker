import { btcPrice } from '../js/btc-price'

const exchange = {
  state: {
    btcInUSD: 6.28 // exchange rate
  },
  // mutations: {
  //   updateBtcPrice (state, newBtcPrice) {
  //     // console.log('[exchange] updateBtcPrice', newBtcPrice)
  //     state.btcInUSD = newBtcPrice
  //   }
  // },
  getters: {
    btcInUSD: (state, getters, rootState) => {
      // console.log(rootState.game.time)
      return btcPrice(rootState.game.time)
    },
    btcInUsdDerivation: (state, getters, rootState) => {
      const speed = rootState.game.speed
      const today = rootState.game.time
      return btcPrice(today) - btcPrice(today - speed)
    }
  },
  actions: {
    sellBtc ({ commit, state, getters }, amount) {
      if (amount > state.btc || amount <= 0) {
        return console.log('Won\'t sell %s BTC!', amount)
      }
      // const btcInUSD = getters.btcInUSD
      // console.log('btcInUSD', btcInUSD)
      commit('addBtc', -amount)
      commit('addUsd', amount * getters.btcInUSD)
    }
  }
}

export default exchange
