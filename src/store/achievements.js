import techtree from '../js/techtree'

const goals = {
  firstComputer: {
    title: 'First computer',
    message: `Congratulations, you just bough your first computer!
    Research ${techtree.computer[0].title} to set up your computer
    for Bitcoin mining.`,
    watch: (store) => store.inventory.computer === 1
  },
  firstMiner: {
    title: 'First miner deployed',
    message: `You can sell mined coins to pay your bills.
    Mind, that the Bitcoin prices varys over time.`,
    watch: (store) => store.deployment.computer === 1
  },
  fullFlat: {
    title: 'No space left',
    message: 'You can rent more space to deploy additional miner.',
    watch: (store, getter) => getter.usedSpace === 10
  }
}

function watchAchievements (store) {
  Object.keys(goals).forEach((key) => {
    goals[key].unwatch = store.watch(goals[key].watch, (newVal, oldVal) => {
      // free some resources
      goals[key].unwatch()
      delete goals[key].watch
      delete goals[key].unwatch
      store.commit('log', goals[key].message)
      store.commit('achieve', key)
    })
  })
}

const achievements = {
  state: {
    ...Object.keys(goals).reduce((acc, key) => ({ ...acc, [key]: 0 }), {})
  },
  getters: {
    goalsReached: (state) => {
      return Object.keys(state)
        .filter(key => state[key])
        .map(key => ({ ...state[key], id: key }))
    },
    goalsOpen: (state) => {
      return Object.keys(state)
        .filter(key => !state[key])
        .map(key => ({ ...state[key], id: key }))
    }
  },
  mutations: {
    achieve: (state, achievement) => {
      if (achievement in state) {
        state[achievement]++
      } else {
        console.warn('[achievements] unregistered achievement', achievement)
      }
    }
  }
}

export {
  achievements,
  watchAchievements,
  goals
}
