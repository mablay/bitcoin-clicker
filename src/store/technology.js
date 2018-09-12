import techtree from '../js/techtree'

const technology = {
  state: {
    ...Object.keys(techtree).reduce((acc, tech) => {
      acc[tech] = 0
      return acc
    }, {})
  },
  mutations: {
    addToTechnology: (state, {item, amount}) => (state[item] += amount),
    research: (state, tech) => state[tech]++
  },
  actions: {
    research ({commit, state}, task) {
      const tech = task.context
      const level = state[tech] + 1
      console.log('[store] research %s level %d', tech, level)
      this.dispatch('work', task).then(() => {
        commit('research', tech)
        commit('log', `researched ${tech} (${level})`)
      })
    }
  }
}

export default technology
