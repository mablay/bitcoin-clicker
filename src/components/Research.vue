<template>
  <div class="view research">
    <h2>Research</h2>
    <Action v-bind:duration="2000"
            v-bind:enabled="!pickaxe"
            v-bind:done="inventPickaxe">Invent Pickaxe</Action>
    <p>Pickaxe: {{pickaxeStatus}}</p>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Research',
  components: {
    Action
  },
  computed: mapState({
    pickaxe: (state) => state.tech.pickaxe,
    pickaxeStatus: (state) => state.pickaxe ? 'invented' : 'needs research'
  }),
  methods: mapActions(['inventPickaxe'])
}
</script>

<style>
.research {
  grid-area: research;
}
</style>
