<template>
  <div class="view research">
    <h4>Research</h4>
    <Action
      v-for="(tech, key) in techtree"
      v-if="show[key]"
      :key="key"
      :duration="tech[vm[key]].duration"
      :enabled="true"
      :context="key"
      :title="JSON.stringify(tech[vm[key]], null, 4)"
      :action="research">{{ tech[vm[key]].title }}</Action>
  </div>
</template>

<script>
import Action from './Action.vue'
import { mapActions, mapState } from 'vuex'
import techtree from '../js/techtree'
export default {
  name: 'Research',
  components: {
    Action
  },
  data () {
    return {
      techtree,
      vm: this
    }
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
  methods: mapActions(['research'])
}
</script>

<style>
.research {
  grid-area: research;
}
</style>
