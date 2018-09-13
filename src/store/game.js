import market from '../js/market'

const game = {
  state: {
    speed: 10,
    difficulty: 1,
    history: []
  },
  getters: {
    hashrate: (state, getters, rootState) => {
      const miners = Object.keys(market).filter(item => 'kHps' in market[item])
      const hashrate = miners.reduce((kHps, miner) => {
        return kHps + market[miner].kHps * rootState.inventory[miner]
      }, 0)
      console.log('hashrate [kHps]', hashrate)
      return hashrate
    }
  },
  mutations: {
    log: (state, msg) => {
      state.history.splice(0, 0, {id: Date.now(), msg})
      const n = state.history.length
      if (n > 8) state.history.splice(n - 1, 1)
    }
  },
  actions: {
    work ({commit, state}, task) {
      return new Promise((resolve) => {
        const timer = setInterval(() => {
          task.millis += 20 * state.speed
          if (task.millis >= task.duration) {
            task.millis = 1e16 // larger than any duration but not inifinity
            clearInterval(timer)
            resolve()
          }
        }, 20)
      })
    }
  }
}

export default game
