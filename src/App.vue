<template>
  <div class="theme" v-bind:class="getTheme()">
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
      console.log(state.game)
      return state.game.theme
    }
  }),
  methods: {
    getTheme () {
      return this.theme
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

.btn {
  @include themify($themes) {
    // border: themed('buttonBorder');
    color: themed('buttonTextColor');
    border-color: themed('buttonTextColor');
    background-color: themed('buttonColor');

    &:hover {
      color: themed('buttonTextHoverColor');
      border-color: themed('buttonTextHoverColor');
      background-color: themed('buttonHoverColor');
    }
  }
}
</style>
