<template>
  <div class="game">
    <History></History>
    <Research></Research>
    <Production></Production>
    <Inventory></Inventory>
    <Technology></Technology>
  </div>
</template>

<script>
import Production from './Production.vue'
import Research from './Research.vue'
import History from './History.vue'
import Inventory from './Inventory.vue'
import Technology from './Technology.vue'
export default {
  name: 'Game',
  // data () {},
  components: {
    Production,
    History,
    Inventory,
    Technology,
    Research
  }
}
</script>

<style>
.game {
  display: grid;
  grid-template-columns: 200px 200px 200px 200px auto;
  grid-template-rows: auto;
  grid-template-areas: "history production research inventory technology";
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
