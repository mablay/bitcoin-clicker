<template>
  <div class="view research">
    <h2>Research</h2>
    <Action v-for="(tech, key) in techtree"
            :key="key"
            v-if="show[key]"
            v-bind:duration="tech[vm[key]].duration * 1000"
            v-bind:enabled="true"
            v-bind:context="key"
            v-bind:action="research">{{key}}</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions, mapState } from 'vuex'
import techtree from '../js/techtree'
export default {
  name: 'Research',
  data () {
    return {
      techtree,
      vm: this
    }
  },
  components: {
    Action
  },
  computed: {
    ...mapState(Object.keys(techtree).reduce((acc, tech) => {
      acc[tech] = (state) => state.technology[tech]
      return acc
    }, {})),
    ...mapState({
      show: (state) => Object.keys(techtree).reduce((acc, tech) => {
        const level = state.technology[tech]
        if (techtree[tech].length <= level) {
          acc[tech] = false
          return acc
        }
        const curTech = techtree[tech][level]
        if (curTech.require === undefined) {
          acc[tech] = true
        } else {
          acc[tech] = Object.keys(curTech.require).every(requirement => {
            return state.technology[requirement] >= curTech.require[requirement]
          })
        }
        return acc
      }, {})
    })
  },
  methods: mapActions(['inventPickaxe', 'research'])
}
</script>

<style>
.research {
  grid-area: research;
}
</style>
