<template>
  <div class="view production">
    <!-- <h2>Market</h2> -->

    <h4>Savings</h4>
    <div class="row">
      <div
        :class="{ danger: usd < 0 }"
        class="col stats">$ {{ usd.toFixed(2) }} USD</div>
      <div class="col stats">&#8383; {{ prefix(btc, {unit:'BTC'}) }}</div>
    </div>

    <!-- <h4>Buy Products</h4> -->
    <div
      v-for="(item, key) in market"
      v-if="isAvailable[key]"
      :key="key"
      class="row">
      <div class="col-6">
        <Action
          :duration="item.buyDuration"
          :enabled="isAffordable[key]"
          :context="key"
          :title="JSON.stringify(item, null, 4)"
          :action="buy">Buy {{ item.title }}</Action>
      </div>
      <div class="col-6">
        <Action
          :duration="item.deployDuration"
          :enabled="inventory[key] > deployments[key]"
          :context="key"
          :title="JSON.stringify(item, null, 4)"
          :action="deploy">Deploy {{ item.title }}</Action>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h4>BTC Price</h4>
        <div class="stats">
          <Stats
            :format="x => `\$${x.toFixed(2)} USD`"
            :offset="btcInUSD"
            :rate="btcInUsdDerivation" />
        </div>
      </div>
      <div class="col-6">
        <Action
          v-if="true"
          :duration="btcSellDuration"
          :enabled="btc > 0"
          :action="sell"
          class="align-bottom"
          context="btc">Sell BTC</Action>
      </div>
    </div>
  </div>
</template>

<script>
import Action from './Action.vue'
import Stats from './Stats.vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import market from '../js/market'
const { prefix } = require('metric-prefix')

export default {
  name: 'Production',
  components: { Action, Stats },
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
      btcPrice: (state, getters) => getters.btcInUSD.toFixed(2),
      dailyExpenses: (state, getters, rootState) => getters.dailyRental + getters.dailyUtilityBill
    }),
    ...mapGetters([
      'isAvailable',
      'isAffordable',
      'inventory',
      'deployments',
      'btcInUSD',
      'btcInUsdDerivation'
    ]),
    btcSellDuration: () => market.btcSellDuration
  },
  methods: {
    ...mapActions(['buy', 'sell', 'deploy']),
    prefix
  }
}
</script>

<style>
.production {
  grid-area: production;
}
</style>
