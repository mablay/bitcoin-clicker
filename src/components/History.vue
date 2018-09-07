<template>
  <div class="view history">
    <h2>History</h2>
    <p v-for="(activity, index) in history"
       :key="index"
       v-bind:style="{color: `hsl(120, 0%, ${100 - index * 10}%)`}">{{activity}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'History',
  computed: mapState(['history'])
}
</script>

<style>
.history {
  grid-area: history;
}
</style>
