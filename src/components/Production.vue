<template>
  <div class="view production">
    <h2>Market</h2>

    <h4 class="text-center">Savings</h4>
    <div>${{ usd }} USD</div>
    <div>&#8383;{{ btc }} BTC</div>

    <h4 class="text-center">Buy Products</h4>
    <Action
      v-for="(item, key) in market"
      v-if="isAvailable[key]"
      :key="key"
      :duration="item.buyDuration"
      :enabled="isAffordable[key]"
      :context="key"
      :title="JSON.stringify(item, null, 4)"
      :action="buy">Buy {{ item.title }}</Action>

    <h4 class="text-center">BTC Price</h4>
    <div>${{ btcPrice }} USD</div>
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
      usd: (state) => state.inventory.usd.toFixed(2),
      btc: (state) => state.inventory.btc.toFixed(4),
      btcPrice: (state, getters) => getters.btcInUSD.toFixed(2)
    }),
    ...mapGetters(['isAvailable', 'isAffordable']),
    btcSellDuration: () => market.btcSellDuration
  },
  methods: mapActions(['buy', 'sell'])
}
</script>

<style>
.production {
  grid-area: production;
}
</style>
