<template>
  <div class="view production">
    <h2>Production</h2>
    <Action v-bind:duration="200"
            v-bind:action="gatherWood">Gather wood</Action>
    <Action v-bind:duration="500"
            v-bind:action="gatherGold">Gather gold</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapState, mapActions } from 'vuex'
import { mapInventory } from '../store'
export default {
  name: 'Production',
  components: {
    Action
  },
  computed: {
    ...mapState(['pickaxe']),
    ...mapInventory()
  },
  methods: {
    ...mapActions([
      'gatherWood',
      'gatherGold',
      'inventPickaxe'
    ])
  }
}
</script>

<style>
.production {
  /* text-align: center; */
  grid-area: production;
}
</style>
