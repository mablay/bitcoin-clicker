<template>
  <div class="view deployment">
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
        <h4>Daily Rent</h4>
        <div class="stats danger">${{ dailyRental.toFixed(2) }}</div>
      </div>
      <div class="col-6">
        <h4>Daily Utility Bill</h4>
        <div class="stats danger">${{ dailyUtilityBill.toFixed(2) }} USD</div>
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
      <div class="col-4"><h4>Hashrate</h4></div>
    </div>

    <div class="row">
      <div class="col-4"><div class="stats">Computer</div></div>
      <div class="col-4"><div class="stats">3 / 4</div></div>
      <div class="col-4"><a href="">deploy</a></div>
    </div>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import rentalMarket from '../js/rental-market'

export default {
  name: 'Deployment',
  components: { Action },
  computed: {
    ...mapState({
      space: (state) => state.inventory.space,
      contracts: (state) => rentalMarket
    }),
    ...mapGetters([
      'totalSpace',
      'usedSpace',
      'gpuSlots',
      'gpusDeployed',
      'dailyRental',
      'dailyUtilityBill'
    ])
  },
  methods: mapActions(['rentSpace'])
}
</script>

<style>
.deployment {
}
</style>
