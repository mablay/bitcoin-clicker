<template>
  <div class="view production">
    <!-- <h2>Market</h2> -->

    <div><b>Savings</b></div>
    <div class="row">
      <div
        :class="{ danger: usd < 0 }"
        class="col stats"
      >$ {{ usd.toFixed(2) }} USD</div>
      <div class="col stats">&#8383; {{ prefix(btc, {unit:'BTC'}) }}</div>
    </div>

    <!-- <h4>Buy Products</h4> -->
    <Action
      v-for="(item, key) in market"
      v-if="isAvailable[key]"
      :key="key"
      :duration="item.buyDuration"
      :enabled="isAffordable[key]"
      :context="key"
      :title="JSON.stringify(item, null, 4)"
      :action="buy">Buy {{ item.title }}</Action>

    <div><b>BTC Price</b></div>
    <div class="stats">${{ btcPrice }} USD</div>
    <Action
      v-if="true"
      :duration="btcSellDuration"
      :enabled="btc > 0"
      :action="sell"
      context="btc">Sell BTC</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import market from '../js/market'
const { prefix } = require('metric-prefix')

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
    ...mapState({
      usd: (state) => state.inventory.usd,
      btc: (state) => state.inventory.btc,
      btcPrice: (state, getters) => getters.btcInUSD.toFixed(2)
    }),
    ...mapGetters(['isAvailable', 'isAffordable']),
    btcSellDuration: () => market.btcSellDuration
  },
  methods: {
    ...mapActions(['buy', 'sell']),
    prefix
  }
}
</script>

<style>
.production {
  grid-area: production;
}
</style>
