<template>
  <div class="view hashrate">
    <div class="digits difficulty">
      {{difficulty}}
    </div>
    <div class="digits last-hash">
      {{lastHash}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { binaryDifficultyString } from '../bc-lib'
export default {
  name: 'Hashrate',
  computed: mapState({
    difficulty: (state) => binaryDifficultyString(256, state.difficulty),
    lastHash: 'lastHash'
  })
}
</script>

<style>
.hashrate {
  grid-area: hashrate;
}
.hashrate .digits {
  font-family: monospace;
  font-size: 8px;
}
</style>
