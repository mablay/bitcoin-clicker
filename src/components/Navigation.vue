<template>
  <div id="nav">
    <span
      class="spanlink"
      @click="setTheme('light')">&#9728;</span>

    <span
      class="spanlink"
      @click="setTheme('dark')">&#9790;</span>

    <span class="version"> v{{ version }}</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { version } from '../../package.json'

export default {
  name: 'Nav',
  data: () => ({ version }),
  methods: mapMutations(['setTheme'])
}
</script>

<style lang="scss">
#nav {
  .version {
    font-size: 16px;
    padding-right: 20px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
