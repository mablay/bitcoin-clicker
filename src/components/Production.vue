<template>
  <div class="view production">
    <h2>Mining</h2>
    <Action v-for="(item, key) in market"
            :key="key"
            v-if="show[key]"
            v-bind:duration="1000"
            v-bind:enabled="true"
            v-bind:context="key"
            v-bind:action="buy">Buy {{item.title}}</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions, mapState } from 'vuex'
import market from '../js/market'

export default {
  name: 'Production',
  data () {
    return {
      market,
      vm: this
    }
  },
  components: {
    Action
  },
  computed: {
    ...mapState(Object.keys(market).reduce((acc, item) => {
      acc[item] = (state) => state.inventory[item] || 0
      return acc
    }, {})),
    ...mapState({
      show: (state) => Object.keys(market).reduce((acc, item) => {
        const curItem = market[item]
        if (curItem.tech === undefined) {
          acc[item] = true
        } else {
          acc[item] = Object.keys(curItem.tech).every(requirement => {
            const level = state.technology[item]
            return level >= curItem.tech[requirement]
          })
        }
        return acc
      }, {})
    })
  },
  methods: {
    ...mapActions([
      'buyComputer',
      'buy'
    ])
  }
}
</script>

<style>
.production {
  /* text-align: center; */
  grid-area: production;
}
</style>
