<template>
  <div class="view technology">
    <h2>Technology</h2>
    <p v-for="(level, tech) in technology" :key="tech">{{tech}}: {{pickaxeStatus}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Technology',
  computed: mapState({
    technology: (state) => state.technology,
    pickaxeStatus: (state) => state.technology.pickaxe ? 'invented' : 'needs research'
  })
}
</script>

<style>
.technology {
  grid-area: technology;
}
</style>
