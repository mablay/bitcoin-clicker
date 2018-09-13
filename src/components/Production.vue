<template>
  <div class="view production">
    <h2>Market</h2>
    <Action v-for="(item, key) in market"
            :key="key"
            v-if="isAvailable[key]"
            v-bind:duration="1000"
            v-bind:enabled="isAffordable[key]"
            v-bind:context="key"
            v-bind:action="buy">Buy {{item.title}}</Action>
    <Action v-if="true"
            v-bind:duration="5000"
            v-bind:enabled="btc > 0"
            context="btc"
            v-bind:action="sell">Sell BTC</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import market from '../js/market'

export default {
  name: 'Production',
  data () {
    return {
      market,
      vm: this
    }
  },
  components: { Action },
  computed: {
    ...mapState(Object.keys(market).reduce((acc, item) => {
      acc[item] = (state) => state.inventory[item] || 0
      return acc
    }, {})),
    ...mapGetters(['isAvailable', 'isAffordable'])
  },
  methods: mapActions(['buy', 'sell'])
}
</script>

<style>
.production {
  grid-area: production;
}
</style>
