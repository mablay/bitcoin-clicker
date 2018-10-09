import Vue from 'vue'
import Vuex from 'vuex'
import game from './game'
import modal from './modal'
import mining from './mining'
import exchange from './exchange'
import inventory from './inventory'
import technology from './technology'
import deployment from './deployment'
import { achievements } from './achievements'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    game,
    modal,
    mining,
    exchange,
    inventory,
    technology,
    deployment,
    achievements
  },
  strict: process.env.NODE_ENV !== 'production'
})
