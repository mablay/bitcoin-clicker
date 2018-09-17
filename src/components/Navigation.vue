<template>
  <div id="nav">
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    <span
      class="spanlink"
      @click="setTheme('light')">&#9728;</span>

    <span
      class="spanlink"
      @click="setTheme('dark')">&#9790;</span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Nav',
  methods: mapMutations(['setTheme'])
}
</script>

<style lang="scss">
#nav {
  grid-area: nav;
  padding: 4px;
  text-align: right;
  .spanlink {
    font-size: 32px;
    padding: 6px;
    cursor: pointer;
    // text-decoration: underline;
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
