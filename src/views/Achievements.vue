<template>
  <div class="container-fluid achievements">
    <h3>Achievements</h3>
    <div
      v-for="(item, key) of achievements"
      :key="key"
      class="achievement">
      {{ item }}
    </div>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { goals } from '../store/achievements'
export default {
  name: 'Achievements',
  computed: mapState({
    achievements: (state) => Object.keys(state.achievements)
      .filter(key => state.achievements[key])
      .map(key => goals[key].title)
  })
}
</script>

<style lang="scss">

</style>
