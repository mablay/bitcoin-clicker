const accounting = {
  state: {
    utility: 0,
    rent: 0,
    salary: 0
  },
  actions: {
    endOfMonth: ({ state, commit }) => {
      const sum = Object
        .keys(state)
        .reduce((acc, position) => acc + state[position], 0)

      console.log('[accounting] endOfMonth settleCharges', sum)

      commit('addToInventory', {
        item: 'usd',
        amount: -sum
      })
      commit('clearCharges')
    },
    beginningOfMonth: ({ state, commit }) => {
      console.log('[accounting] beginningOfMonth')
    }
    // payMonthlyBills ({ commit, state, getters }) {
    //   console.log('[payMonthlyBills]', getters.monthlyExpenses)
    //   commit('addToInventory', { item: 'usd', amount: -getters.monthlyExpenses })
    // }
  },
  mutations: {
    chargeCosts: (state, { position, amount }) => {
      if (!position || !(position in state)) {
        throw new Error(`Unknown accounting position: ${position}`)
      }
      if (typeof amount !== 'number') {
        throw new Error('amount must be a number!')
      }
      state[position] += amount
    },
    clearCharges: (state) => {
      for (const position in state) {
        state[position] = 0
      }
    }
  }
}

export default accounting
