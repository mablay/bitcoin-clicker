<template>
  <div class="view inventory">
    <h2>Inventory</h2>
    <div class="content">
      <p v-for="(item, key) in inventory" :key="key">
        <span class="item-amount">{{item}}</span> <span class="item-title">{{key}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { skipProperties, nonZeroProperties } from '../js/util'

export default {
  name: 'Inventory',
  computed: {
    ...mapGetters([
      'watt',
      'space'
    ]),
    inventory () {
      return skipProperties(
        nonZeroProperties(this.$store.state.inventory),
        ['usd', 'btc']
      )
    }
  }
}
</script>

<style lang="scss">
.inventory {
  grid-area: inventory;
  .item-amount {
    padding-right: 8px;
    display: inline-block;
    width: 72px;
    text-align: right;
  }
  .item-title {
    display: inline-block;
    width: 120px;
    text-align: left;
  }
}
</style>
