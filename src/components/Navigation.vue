<template>
  <div id="nav">
    <span
      class="spanlink"
      @click="setTheme('light')">&#9728;</span>

    <span
      class="spanlink"
      @click="setTheme('dark')">&#9790;</span>

    <span class="version"> v{{ version }}</span>

    <GameTime />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { version } from '../../package.json'
import GameTime from '@/components/GameTime'

export default {
  name: 'Nav',
  components: { GameTime },
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
  .spanlink {
    padding-right: 14px;
    opacity: 0.8;
    cursor: pointer;
  }
  .spanlink:hover {
    opacity: 1.0;
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
