<template>
  <div class="view mining">
    <!-- <div class="stats">
      <div>Date {{ gameTime }}</div>
      <div>Chain height {{ chainheight }}</div>
    </div> -->
    <!-- <div class="stats">
      <div>kWh Price {{ kwhPrice }}</div>
      <div>Power {{ (powerConsumption / 1000).toFixed(2) }}kW</div>
    </div> -->
    <div class="row">
      <div class="col-6 col-md-3">
        <h4>Hashrate</h4>
        <div class="stats">{{ hashrateText }}</div>
      </div>
      <div class="col-6  col-md-3">
        <h4>Network</h4>
        <div class="stats">
          <Stats
            :format="x => prefix(x)"
            :offset="networkHashrate"
            :rate="networkHashrateDerivation" />
        </div>
      </div>
      <div class="col-6  col-md-3">
        <h4>Date</h4>
        <div class="stats">{{ gameTime }}</div>
      </div>
      <div class="col-6  col-md-3">
        <h4>Monthly Expenses</h4>
        <div class="stats danger">$ -{{ monthlyExpenses.toFixed(2) }} USD</div>
      </div>
      <div class="col-6  col-md-3">
        <router-link :to="{ name: 'settings' }">
          <span class="spanlink">Settings</span>
        </router-link>
        <span class="spacer" />
        <router-link :to="{ name: 'achievements' }">
          <span class="spanlink">Achievements</span>
        </router-link>
        <div class="stats"><Nav/></div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Navigation.vue'
import Stats from '@/components/Stats.vue'
import { mapState, mapGetters } from 'vuex'
import prefixer from 'metric-prefix'
const hpsPrefix = prefixer({ unit: 'H/s' })

export default {
  name: 'Mining',
  components: { Nav, Stats },
  computed: {
    ...mapState({
      hashrateText: (state, getters) => getters.hashrateText,
      networkHashrate: (state, getters) => getters.networkHashrate,
      networkHashrateDerivation: (state, getters, rootState) => getters.networkHashrate / state.game.speed * 800,
      chainheight: (state, getters) => getters.chainheight,
      gameTime: (state) => (new Date(state.game.time * 1000)).toLocaleDateString(),
      btc: (state) => state.inventory.btc.toFixed(4),
      usd: (state) => state.inventory.usd.toFixed(2),
      btcPrice: (state, getters) => getters.btcInUSD,
      kwhPrice: (state) => 0.19,
      powerConsumption: (state, getters) => getters.watt,
      utilityBill: (state) => state.mining.utilityBill
    }),
    ...mapGetters([
      'monthlyExpenses'
    ])
  },
  methods: {
    prefix (value) {
      return hpsPrefix(value)
    }
  }
}
</script>

<style lang="scss">
.mining {
  padding: 4px;
  text-align: left;
}

.spacer {
  padding-right: 12px;
}
</style>
