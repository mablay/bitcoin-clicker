<template>
  <div class="game container-fluid">
    <div class="row">
      <div class="col-xl">
        <Mining/>
      </div>
      <div class="col-xl col-md-6">
        <Production/>
      </div>
      <div class="col-xl col-md-6">
        <Inventory/>
      </div>
      <div class="col-xl col-md-6">
        <Research/>
      </div>
      <div class="col-xl col-md-6">
        <Technology/>
      </div>
      <!-- <div class="col-xl d-none d-xl-block">
        <History/>
      </div> -->
    </div>
    <Nav/>
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
import { linearClock } from '@/js/clockwork'

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
    const tick = (arg) => this.$store.dispatch('tick', arg)
    const { frameDuration } = this.$store.state.game
    // const blockTime = 600 // 600s RT ~ (600 / speed)s GT
    this.clock = linearClock(frameDuration, tick).start()
  },
  beforeDestroy () {
    this.clock.stop()
  }
}
</script>

<style>
.game {
  /* display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  grid-template-rows: 60px auto;
  grid-template-areas:
    "mining mining mining mining mining nav"
    "production inventory research technology history history"
  ; */
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
