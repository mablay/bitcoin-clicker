import Vuex from 'vuex'

const store = () => new Vuex.Store({
  state: {
    inventory: {
      wood: 0,
      gold: 0
    },
    tech: {
      pickaxe: 0
    },
    history: []
  },
  mutations: {
    addToInventory: (state, {item, amount}) => (state.inventory[item] += amount),
    goldAdd: (state, amount) => (state.gold += amount),
    inventPickaxe: (state) => (state.tech.pickaxe = 1),
    log: (state, msg) => {
      state.history.unshift(msg)
      if (state.history.length > 8) state.history.pop()
    }
  },
  actions: {
    gatherWood ({commit, state}) {
      const amount = 5
      commit('addToInventory', {item: 'wood', amount})
      commit('log', `Gathered ${amount} wood`)
    },
    gatherGold ({commit, state}) {
      const amount = 1 + state.tech.pickaxe * 2 // might be different depending on app state
      commit('addToInventory', {item: 'gold', amount})
      commit('log', `Gathered ${amount} gold`)
    },
    inventPickaxe ({commit}) {
      commit('inventPickaxe')
      commit('log', `Invented Pickaxe`)
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
