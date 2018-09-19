<template>
  <div
    :class="getTheme()"
    class="theme">
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: mapState({
    theme: (state) => {
      // console.log(state.game)
      return state.game.theme
    }
  }),
  mounted () {
    console.log('App started')
  },
  methods: {
    getTheme () {
      return 'theme-'.concat(this.theme)
    }
  }
}
</script>

<style lang="scss">
@import 'styles/themes.scss';

html,body,.theme,#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: scroll;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  @include themify($themes) {
    color: themed('textColor');
    background-color: themed('backgroundColor');
  }
}

</style>
