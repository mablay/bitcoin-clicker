import techtree from '../js/techtree'
import market from '../js/market'

const technology = {
  state: {
    ...Object.keys(techtree).reduce((acc, tech) => {
      acc[tech] = 0
      return acc
    }, {})
  },
  mutations: {
    addToTechnology: (state, { item, amount }) => (state[item] += amount),
    research: (state, tech) => {
      const level = state[tech]++
      if (techtree[tech][level].effect) {
        // this is about the effects the tech has on things
        // effect could look like:
        // { computer: { kHps: 2 } }
        // which means: this tech doubles every computers hashrate
        const effect = techtree[tech][level].effect
        for (let thing in effect) {
          for (let prop in effect[thing]) {
            const oldValue = market[thing][prop]
            market[thing][prop] *= effect[thing][prop]
            console.log(`[technology] ended research ${tech} level ${level} changed ${thing}.${prop} from ${oldValue} to ${market[thing][prop]}`)
          }
        }
      }
    }
  },
  actions: {
    research ({ commit, state }, task) {
      const tech = task.context
      const level = state[tech]
      // console.log('[technology] begin research %s level %d', tech, level)
      this.dispatch('work', task).then(() => {
        commit('research', tech)
        // In the history log we'll show tech `level + 1`
        // because users like to start counting
        // with 1 instead of 0
        commit('log', `researched ${tech} (${level + 1})`)
      })
    }
  }
}

export default technology
