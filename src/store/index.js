import Vuex from 'vuex'
import game from './game'
import inventory from './inventory'
import technology from './technology'

const store = () => new Vuex.Store({
  modules: {
    game,
    inventory,
    technology
  }
})

export default store
