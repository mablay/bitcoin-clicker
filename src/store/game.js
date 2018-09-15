const game = {
  state: {
    speed: 10,
    history: [],
    theme: 'light'
  },
  mutations: {
    log: (state, msg) => {
      state.history.splice(0, 0, { id: Date.now(), msg })
      const n = state.history.length
      if (n > 8) state.history.splice(n - 1, 1)
    },
    setTheme: (state, theme) => {
      console.log('Set theme:', theme)
      state.theme = theme
    }
  },
  getters: {
    theme: (state) => state.theme || 'light'
  },
  actions: {
    work ({ commit, state }, task) {
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
