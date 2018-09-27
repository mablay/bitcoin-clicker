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
      <div class="col">
        <div class="row">
          <div class="col">
            <div><b>Hashrate</b></div>
            <div class="stats">{{ hashrateText }}</div>
          </div>
          <div class="col">
            <div><b>Network</b></div>
            <div class="stats">{{ networkHashrateText }}</div>
          </div>
        </div>
      </div>
      <div class="col">
        <div><b>Daily Utility Bill</b></div>
        <div class="stats">${{ dailyUtilityBill.toFixed(2) }} USD</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { metricUnit } from '../js/blockchain'
import prefixer from 'si-prefixer'

export default {
  name: 'Mining',
  computed: mapState({
    hashrateText: (state, getters) => getters.hashrateText,
    networkHashrate: (state, getters) => getters.networkHashrate,
    networkHashrateText: (state, getters) => prefixer(getters.networkHashrate, 'H/s', 3),
    chainheight: (state, getters) => getters.chainheight,
    gameTime: (state) => (new Date(state.game.time * 1000)).toLocaleDateString(),
    btc: (state) => state.inventory.btc.toFixed(4),
    usd: (state) => state.inventory.usd.toFixed(2),
    btcPrice: (state, getters) => getters.btcInUSD,
    kwhPrice: (state) => 0.19,
    powerConsumption: (state, getters) => getters.watt,
    utilityBill: (state) => state.mining.utilityBill,
    dailyUtilityBill: (state, getters) => getters.dailyUtilityBill
  })
}
</script>

<style lang="scss">
.mining {
  // font-size: 20px;
  // grid-area: mining;
  padding: 4px;
  text-align: left;

  // .stats {
  //   display: inline-block;
  //   width: 250px
  // }
}

</style>
