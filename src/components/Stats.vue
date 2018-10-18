<template>
  <span class="stats">{{ format(value) }}</span>
</template>

<script>
import { clockwork } from '../js/clockwork'
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
  created () {
    this.clock = clockwork.create(FRAME_DURATION, () => {
      this.value += this.rate / FPS
    })
  },
  mounted () {
    // clockwork.start(this.clock)
  },
  beforeDestroy () {
    clockwork.destroy(this.clock)
  }
}
</script>

<style lang="scss">
</style>
