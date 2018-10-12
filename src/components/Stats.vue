<template>
  <span class="stats">{{ format(value) }}</span>
</template>

<script>
import { linearClock } from '../js/clockwork'
const FPS = 25
const FRAME_DURATION = 1000 / FPS

export default {
  name: 'Stats',
  props: {
    offset: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    format: { type: Function, default: x => x }
  },
  data () {
    return { value: this.offset }
  },
  watch: {
    offset (val) {
      this.value = val
    }
  },
  mounted () {
    this.clock = linearClock(FRAME_DURATION, () => {
      this.value += this.rate / FPS
    }).start()
  },
  beforeDestroy () {
    this.clock.stop()
  }
}
</script>

<style lang="scss">
</style>
