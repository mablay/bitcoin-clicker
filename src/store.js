import Vuex from 'vuex'
import { randomBinaryString, countLeadingZeros } from './bc-lib'
import techtree from './js/techtree'

const store = () => new Vuex.Store({
  state: {
    speed: 10,
    difficulty: 1,
    inventory: {
      btc: 0,
      usd: 100,
      laptop: 1 // 100 kH/s
    },
    technology: {
      ...Object.keys(techtree).reduce((acc, tech) => {
        acc[tech] = 0
        return acc
      }, {})
    },
    history: []
  },
  mutations: {
    addToInventory: (state, {item, amount}) => (state.inventory[item] += amount),
    addToTechnology: (state, {item, amount}) => (state.technology[item] += amount),
    lastHash: (state, hash) => (state.lastHash = hash),
    blockMined: (state, amount) => (state.inventory.btc += amount),
    research: (state, tech) => state.technology[tech]++,
    buy: (state, {item, amount, price}) => state.inventory[item]++,
    sell: (state, {item, amount, price}) => state.inventory[item]--,
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
    },
    research ({commit, state}, task) {
      const tech = task.context
      const level = state.technology[tech] + 1
      console.log('[store] research %s level %d', tech, level)
      this.dispatch('work', task).then(() => {
        commit('research', tech)
        commit('log', task.title)
      })
    },
    buyComputer ({commit, state}, task) {
      const hash = randomBinaryString(256, 5) // randomBinaryString(256)
      const zeros = countLeadingZeros(hash)
      const hashQuality = zeros - state.difficulty // > 0 means block found
      this.dispatch('work', task).then(() => {
        commit('lastHash', hash)
        if (hashQuality > 0) {
          commit('log', `Block reward 50 BTC`)
          commit('blockMined', 50)
        } else {
          commit('log', `Hash is missing ${1 - hashQuality} zero${(hashQuality === 0) ? '' : 's'}`)
        }

        console.log(`Hash ${zeros}:${hash.substring(0, 10)}...`)
      })
    },
    workGold ({commit, state}, task) {
      const amount = 1 + state.technology.pickaxe * 2 // might be different depending on app state
      this.dispatch('work', task).then(() => {
        commit('addToInventory', {item: 'gold', amount})
        commit('log', `Gathered ${amount} gold`)
      })
    },
    inventPickaxe ({commit}, task) {
      this.dispatch('work', task).then(() => {
        commit('inventPickaxe')
        commit('log', `Invented Pickaxe`)
      })
    }
  }
})

export const mapInventory = () => {
  const items = ['wood', 'gold']
  return {
    ...Vuex.mapState(items.reduce((acc, item) => {
      acc[item] = (state) => state.inventory[item]
      return acc
    }, {})),
    items: (state) => items
  }
}

export default store
