const game = {
  state: {
    /**
     * game speed
     * ----------
     * The speed factor should state how much faster
     * the game time elapses in comparison with the real
     * world.
     * speed: 1 => game and reality progress evenly.
     *          => blocktime 600 seconds
     * speed: 100k => 1 game-year elapses in ~5 minutes.
     *             => blocktime ~ 6ms
     *             => 1 second ~ 1 game-day
     *
     * TODO: change game speed to 100k and aggregate mining rewards per day.
     */
    speed: 86400, // = 60 * 60 * 24 => 1s ~ 1d game time
    history: [],
    theme: 'dark'
  },
  mutations: {
    log: (state, msg) => {
      state.history.splice(0, 0, { id: Date.now(), msg })
      const n = state.history.length
      if (n > 8) state.history.splice(n - 1, 1)
    },
    setTheme: (state, theme) => {
      // console.log('Set theme:', theme)
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
