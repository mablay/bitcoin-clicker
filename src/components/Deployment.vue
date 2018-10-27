<template>
  <div
    v-if="achievements.firstMiner"
    class="view deployment">
    <!-- <h2>Deployment</h2> -->
    <div class="row">
      <div class="col-6">
        <h4>Space</h4>
        <div class="stats">{{ usedSpace }} / {{ totalSpace }}</div>
      </div>
      <div class="col-6">
        <h4>GPU Slots</h4>
        <div class="stats">{{ gpusDeployed }} / {{ gpuSlots }}</div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h4>Monthly Rent</h4>
        <div class="stats danger">${{ monthlyRental.toFixed(2) }}</div>
      </div>
      <div class="col-6">
        <h4>Current Utility Bill</h4>
        <div class="stats danger">${{ utilityBill.toFixed(2) }} USD</div>
      </div>
    </div>

    <Action
      :duration="contracts.flat.duration"
      :enabled="true"
      :action="rentSpace"
      :title="JSON.stringify(contracts.flat, null, 4)"
      context="flat">Rent a flat</Action>

    <div class="row">
      <div class="col-4"><h4>Device</h4></div>
      <div class="col-4"><h4>Mining</h4></div>
      <div class="col-4"><h4>Status</h4></div>
    </div>

    <div
      v-for="({ id, title, stock, deployed, hashrate }) in miners"
      v-if="stock > 0"
      :key="id"
      class="row">
      <div class="col-4"><div class="stats">{{ title }}</div></div>
      <div class="col-4"><div class="stats">{{ deployed }} / {{ stock }}</div></div>
      <div class="col-4">
        {{ hashrate }}
        <!-- <Action
          v-if="deployed < stock"
          :duration="duration"
          :action="deploy"
          :context="id"
          class="btn-small">deploy</Action> -->
      </div>
    </div>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import rentalMarket from '../js/rental-market'
import market from '../js/market'
import prefix from 'metric-prefix'
import { GTIME_DAY as DAY } from '../js/util'
const hpsPrefix = prefix({ unit: 'H/s' })

export default {
  name: 'Deployment',
  components: { Action },
  computed: {
    ...mapState({
      achievements: (state) => state.achievements,
      space: (state) => state.inventory.space,
      contracts: (state) => rentalMarket,
      miners (state, getters) {
        return getters.miners.map(miner => ({
          id: miner,
          title: market[miner].title,
          stock: getters.inventory[miner],
          deployed: getters.deployments[miner],
          hashrate: hpsPrefix(getters.deviceTypeHashrate[miner]),
          duration: market[miner].deployDuration || 1 * DAY
        }))
      },
      utilityBill: (state) => state.accounting.utility
    }),
    ...mapGetters([
      'totalSpace',
      'usedSpace',
      'gpuSlots',
      'gpusDeployed',
      'monthlyRental',
      'monthlyUtilityBill',
      'deployments',
      'inventory',
      'deviceTypeHashrate'
    ])
  },
  methods: mapActions(['rentSpace', 'deploy'])
}
</script>

<style>
.deployment {
}
</style>
