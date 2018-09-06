<template>
  <div class="view production">
    <h1>Production View</h1>
    <Action v-bind:duration="200"
            v-bind:done="() => state.wood += 5">Gather wood</Action>
    <p>wood: {{state.wood}}</p>
  </div>
</template>

<script>
import Action from './Action.vue'
export default {
  name: 'Production',
  props: {
    state: Object
  },
  data () {
    return {
      // state: {}
    }
  },
  components: {
    Action
  },
  methods: {
    aGatherWood () {
      this.state.wood += 5
    }
  }
}
</script>

<style>
.production {
  text-align: center;
  grid-area: production;
}
</style>
