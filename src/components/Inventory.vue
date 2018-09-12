<template>
  <div class="view inventory">
    <h2>Inventory</h2>
    <p v-for="(item, key) in inventory" :key="key">{{key}}: {{item}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Inventory',
  computed: {
    ...mapGetters([
      'watt',
      'space'
    ]),
    inventory () {
      return this.$store.state.inventory
    }
  }
}
</script>

<style>
.inventory {
  grid-area: inventory;
}
</style>
