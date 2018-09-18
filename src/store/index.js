import Vue from 'vue'
import Vuex from 'vuex'
import game from './game'
import mining from './mining'
import exchange from './exchange'
import inventory from './inventory'
import technology from './technology'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    exchange,
    mining,
    inventory,
    technology
  }
})
