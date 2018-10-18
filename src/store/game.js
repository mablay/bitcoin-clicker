import { GTIME_DAY } from '../js/util' // ms
import { clockwork } from '@/js/clockwork'
const GAME_START_TIME = 1380585600 // october 2013
const GAME_FRAME_DURATION = 20

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
     * GT: Game Time
     * RT: Real Time
     * GTU: Game time unit, here it's 1 day
     * At speed 1: 1s GT ~ 1s RT
     * At speed 86400: 1d GT ~ 1s RT
     * At speed 172800: 2d GT ~ 1s RT
     * Durations usually refer to GTU
     * Given an action with a duration of 10
     *  will take 10s RT to complete at speed 86400
     *  will take 5s RT to complete at speed 172800
     */
    time: GAME_START_TIME,
    /* GT seconds elapsing in one RT second */
    speed: GTIME_DAY * 1, // 1s real time ~ 1d game time
    /* game update frequency in milliseconds.
        Does not affect speed! */
    frameDuration: 1000,
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
    },
    updateGameTime (state, gameTime) {
      state.time = gameTime
    }
  },
  getters: {
    theme: (state) => state.theme || 'light'
  },
  actions: {
    tick ({ commit, state, getters }, millis) {
      // millis: elapsed time in RT milliseconds
      // every tick commits a game state update
      const { frameDuration, speed } = state
      const elapsed = (millis / frameDuration) * speed // GT seconds
      const gameTime = state.time + elapsed
      commit('updateGameTime', gameTime)
      // console.log('[tick] game time', new Date(gameTime * 1000))
      this.dispatch('mine', elapsed)
      this.dispatch('payRent', elapsed)
    },
    work ({ commit, state }, task) {
      return new Promise((resolve) => {
        const clock = clockwork.create(GAME_FRAME_DURATION, () => {
          task.millis += (GAME_FRAME_DURATION / 1000) * state.speed
          if (task.millis >= task.duration) {
            task.millis = 1e16 // larger than any duration but not inifinity
            clockwork.destroy(clock)
            resolve()
          }
        })
      })
    }
  }
}

export default game
