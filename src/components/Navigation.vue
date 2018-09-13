<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default { name: 'Nav' }
</script>

<style lang="scss">
#nav {
  grid-area: nav;
  padding: 4px;
  text-align: right;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
