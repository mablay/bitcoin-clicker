<template>
  <div class="game">
    <Hashrate></Hashrate>
    <History></History>
    <Research></Research>
    <Production></Production>
    <Inventory></Inventory>
    <Technology></Technology>
    <modal v-if="showModal">
      <h3 slot="header">Blockchain Adventure</h3>
      <p slot="body">
        It's 2013. You've incidentally read about Bitcoin
        and felt: This is going to be BIG!<br>
        And you want to be part of it.
      </p>
      <button slot="footer"
              class="modal-default-button"
              @click="showModal = false">
        BEGIN
      </button>
    </modal>
  </div>
</template>

<script>
import Hashrate from './Hashrate.vue'
import Production from './Production.vue'
import Research from './Research.vue'
import History from './History.vue'
import Inventory from './Inventory.vue'
import Technology from './Technology.vue'
import Modal from './Modal.vue'

export default {
  name: 'Game',
  // data () {},
  components: {
    Hashrate,
    Production,
    History,
    Inventory,
    Technology,
    Research,
    Modal
  },
  data () {
    return {
      showModal: false
    }
  },
  created () {
    // this.showModal = true
  }
}
</script>

<style>
.game {
  display: grid;
  grid-template-columns: 200px 200px 200px 200px auto;
  grid-template-rows: 20px auto;
  grid-template-areas:
    "hashrate hashrate hashrate hashrate hashrate"
    "history production research inventory technology"
  ;
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
