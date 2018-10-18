<template>
  <div
    class="game container-fluid">
    <div class="row">
      <div class="col-12">
        <Mining/>
      </div>
      <div class="col-xl col-md-6">
        <Production/>
      </div>
      <div class="col-xl col-md-6">
        <Research/>
      </div>
      <div class="col-xl col-md-6">
        <Deployment/>
      </div>
      <!-- <div class="col-xl col-md-4">
        <Inventory/>
      </div> -->
      <!-- <div class="col-xl-2 col-md-6">
        <Technology/>
      </div> -->
      <div class="col-xl col-md-6">
        <History/>
      </div>
    </div>
    <Modal/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/Modal.vue'
import Mining from '@/components/Mining.vue'
import Production from '@/components/Production.vue'
import Research from '@/components/Research.vue'
import History from '@/components/History.vue'
import Inventory from '@/components/Inventory.vue'
import Technology from '@/components/Technology.vue'
import Deployment from '@/components/Deployment.vue'
import { clockwork } from '../js/clockwork/'

export default {
  name: 'Game',
  components: {
    Production,
    Modal,
    History,
    Mining,
    Inventory,
    Technology,
    Research,
    Deployment
  },
  state: () => ({ clock: null }),
  computed: mapState({
    hashrate: (state, getters) => getters.hashrate,
    gamePaused: (state) => {
      const paused = state.game.gamePaused
      console.log('[Game] state:', paused ? 'running' : 'paused')
    }
  }),
  created () {
    const tick = (arg) => this.$store.dispatch('tick', arg)
    const { frameDuration } = this.$store.state.game
    // const blockTime = 600 // 600s RT ~ (600 / speed)s GT
    // this.clock = linearClock(frameDuration, tick).start()
    this.clock = clockwork.create(frameDuration, tick)
  },
  mounted () {
    // clockwork.start(this.clock)
  },
  beforeDestroy () {
    // this.clock.stop()
    console.log('game clock should stop')
    clockwork.destroy(this.clock)
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
