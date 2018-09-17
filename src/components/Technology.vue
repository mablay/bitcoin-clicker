<template>
  <div class="view technology">
    <h2>Technology</h2>
    <p
      v-for="(level, tech) in technology"
      :key="tech">{{ tech }}: {{ level }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import techtree from '../js/techtree'
import { nonZeroProperties } from '../js/util'

export default {
  name: 'Technology',
  data: () => techtree,
  computed: mapState({
    technology: (state) => nonZeroProperties(state.technology)
  })
}
</script>

<style>
.technology {
  grid-area: technology;
}
</style>
