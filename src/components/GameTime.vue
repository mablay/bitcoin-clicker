<template>
  <span class="time-control">
    <span
      v-show="started"
      class="spanlink"
      @click="pause">&#9724;</span>
    <span
      v-show="!started"
      class="spanlink"
      @click="resume">&#9658;</span>
  </span>
</template>

<script>
// Pause and resume game time
import { clockwork } from '../js/clockwork/'

export default {
  name: 'GameTime',
  data: () => ({
    started: clockwork.started
  }),
  methods: {
    resume () {
      clockwork.start()
      this.started = clockwork.started
    },
    pause () {
      clockwork.stop()
      this.started = clockwork.started
    }
  }
}
</script>

<style lang="scss">
</style>
