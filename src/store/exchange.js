const exchange = {
  state: {
    btcInUSD: 6.28 // exchange rate
  },
  actions: {
    sellBtc ({ commit, state }, amount) {
      if (amount > state.btc || amount <= 0) {
        return console.log('Won\'t sell %s BTC!', amount)
      }
      commit('addBtc', -amount)
      commit('addUsd', amount * state.btcInUSD)
    }
  }
}

export default exchange
