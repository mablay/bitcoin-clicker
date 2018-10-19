<template>
  <span class="themeswitch">
    <span
      v-show="theme === 'dark'"
      class="spanlink"
      @click="setTheme('light')">&#9728;</span>

    <span
      v-show="theme !== 'dark'"
      class="spanlink"
      @click="setTheme('dark')">&#9790;</span>
  </span>
</template>

<script>
// Pause and resume game time
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'ThemeSwitch',
  computed: mapState({
    theme: (state) => state.game.theme
  }),
  methods: mapMutations(['setTheme'])
}
</script>

<style lang="scss">
</style>
