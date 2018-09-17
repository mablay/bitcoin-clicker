<template>
  <div class="view production">
    <h2><router-link to="/about">Market</router-link></h2>
    <Action
      v-for="(item, key) in market"
      v-if="isAvailable[key]"
      :key="key"
      :duration="1000"
      :enabled="isAffordable[key]"
      :context="key"
      :action="buy">Buy {{ item.title }}</Action>
    <Action
      v-if="true"
      :duration="5000"
      :enabled="btc > 0"
      :action="sell"
      context="btc">Sell BTC</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import market from '../js/market'

export default {
  name: 'Production',
  components: { Action },
  data () {
    return {
      market,
      vm: this
    }
  },
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
