<template>
  <div class="view inventory">
    <h2>Inventory</h2>
    <p v-for="(item, index) in items" :key="index">{{item}}: {{inventory[item]}}</p>
  </div>
</template>

<script>
import { mapInventory } from '../store'
export default {
  name: 'Inventory',
  computed: {
    ...mapInventory(),
    inventory () {
      return this.$store.state.inventory
    }
  }
}
</script>

<style>
.history {
  grid-area: history;
}
</style>
