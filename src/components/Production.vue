<template>
  <div class="view production">
    <h2>Mining</h2>
    <Action v-bind:duration="1000"
            v-bind:action="buyComputer">Buy Computer</Action>
    <Action v-bind:duration="500"
            v-bind:action="buyComputer">Rent Space</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions } from 'vuex'
import { mapInventory } from '../store'
export default {
  name: 'Production',
  components: {
    Action
  },
  computed: {
    // ...mapState(['pickaxe']),
    ...mapInventory()
  },
  methods: {
    ...mapActions([
      'buyComputer'
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
