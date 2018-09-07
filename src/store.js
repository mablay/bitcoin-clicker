import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    speed: 1,
    inventory: {
      wood: 0,
      gold: 0
    },
    technology: {
      pickaxe: 0
    },
    history: []
  },
  mutations: {
    addToInventory: (state, {item, amount}) => (state.inventory[item] += amount),
    goldAdd: (state, amount) => (state.gold += amount),
    inventPickaxe: (state) => (state.technology.pickaxe = 1),
    log: (state, msg) => {
      state.history.splice(0, 0, {id: Date.now(), msg})
      const n = state.history.length
      if (n > 8) state.history.splice(n - 1, 1)
    }
  },
  actions: {
    gather ({commit, state}, task) {
      return new Promise((resolve) => {
        const timer = setInterval(() => {
          task.millis += 20 * state.speed
          if (task.millis >= task.duration) {
            clearInterval(timer)
            resolve()
          }
        }, 20)
      })
    },
    gatherWood ({commit}, task) {
      const amount = 5
      this.dispatch('gather', task).then(() => {
        commit('addToInventory', {item: 'wood', amount})
        commit('log', `Gathered ${amount} wood`)
      })
    },
    gatherGold ({commit, state}, task) {
      const amount = 1 + state.technology.pickaxe * 2 // might be different depending on app state
      this.dispatch('gather', task).then(() => {
        commit('addToInventory', {item: 'gold', amount})
        commit('log', `Gathered ${amount} gold`)
      })
    },
    inventPickaxe ({commit}, task) {
      this.dispatch('gather', task).then(() => {
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
