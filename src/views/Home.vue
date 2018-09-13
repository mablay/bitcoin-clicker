<template>
  <div class="game">
    <Nav></Nav>
    <Mining></Mining>
    <History></History>
    <Research></Research>
    <Production></Production>
    <Inventory></Inventory>
    <Technology></Technology>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Nav from '@/components/Navigation.vue'
import Mining from '@/components/Mining.vue'
import Production from '@/components/Production.vue'
import Research from '@/components/Research.vue'
import History from '@/components/History.vue'
import Inventory from '@/components/Inventory.vue'
import Technology from '@/components/Technology.vue'
import poisson from '@/js/poisson'

export default {
  name: 'Game',
  components: {
    Nav,
    Production,
    History,
    Mining,
    Inventory,
    Technology,
    Research
  },
  computed: mapState({
    hashrate: (state, getters) => getters.hashrate
  }),
  mounted () {
    const dispatchBlock = (arg) => this.$store.dispatch('block', arg)
    const {speed} = this.$store.state.game
    const blockTime = 1000 / speed // in millis
    console.log('[game]', { speed, blockTime })
    this.clock = poisson(blockTime, dispatchBlock).start()
  },
  beforeDestroy () {
    this.clock.stop()
  }
}
</script>

<style>
.game {
  display: grid;
  grid-template-columns: 200px 200px 200px 200px 200px auto;
  grid-template-rows: 40px auto;
  grid-template-areas:
    "mining mining mining mining mining nav"
    "production inventory research technology history history"
  ;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
