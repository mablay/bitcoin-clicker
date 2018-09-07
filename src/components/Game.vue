<template>
  <div class="game">
    <History></History>
    <Research></Research>
    <Production></Production>
    <Inventory></Inventory>
  </div>
</template>

<script>
import Production from './Production.vue'
import Research from './Research.vue'
import History from './History.vue'
import Inventory from './Inventory.vue'
export default {
  name: 'Game',
  // data () {},
  components: {
    Production,
    History,
    Inventory,
    Research
  }
}
</script>

<style>
.game {
  display: grid;
  grid-template-columns: 200px auto 200px 200px;
  grid-template-rows: auto;
  grid-template-areas: "history production research inventory";
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
