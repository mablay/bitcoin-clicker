import Vue from 'vue'
import Vuex from 'vuex'
import game from './game'
import mining from './mining'
import exchange from './exchange'
import inventory from './inventory'
import technology from './technology'
import deployment from './deployment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    mining,
    exchange,
    inventory,
    technology,
    deployment
  }
})
