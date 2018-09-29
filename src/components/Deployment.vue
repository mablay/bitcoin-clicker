<template>
  <div class="view deployment">
    <h2>Deployment</h2>
    <div class="row">
      <div class="col-sm-6">
        <h4>Space</h4>
        <div class="stats">{{ totalSpace }}</div>
      </div>
      <div class="col-sm-6">
        <h4>Used</h4>
        <div class="stats">{{ usedSpace }}</div>
      </div>
    </div>

    <div>
      <h4>Daily Rent</h4>
      <div class="stats">${{ dailyRental.toFixed(2) }}</div>
    </div>

    <Action
      :duration="contracts.flat.duration"
      :enabled="true"
      :action="rentSpace"
      :title="JSON.stringify(contracts.flat, null, 4)"
      context="flat">Rent a flat</Action>
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
      'dailyRental'
    ])
  },
  methods: mapActions(['rentSpace'])
}
</script>

<style>
.deployment {
}
</style>
