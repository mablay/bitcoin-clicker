<template>
  <div class="game">
    <History v-bind:history="history"></History>
    <Production v-bind:state="state"></Production>
  </div>
</template>

<script>
import Production from './Production.vue'
import History from './History.vue'
export default {
  name: 'Game',
  data () {
    return {
      state: {wood: 5},
      history: []
    }
  },
  computed: {
    wood () {
      return this.state.wood
    }
  },
  watch: {
    // whenever question changes, this function will run
    wood: function (newWood, oldWood) {
      // const amount = newWood - oldWood
      this.history.unshift('Gathered wood +' + Date.now())
      if (this.history.length > 9) this.history.pop()
    }
  },
  components: {
    Production,
    History
  }
}
</script>

<style>
.game {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto;
  grid-template-areas: "history production";
}

.history {
  grid-area: history;
  padding: 12px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
