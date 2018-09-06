<template>
  <div class="view history">
    <h2>History</h2>
    <p v-for="(activity, index) in history"
       :key="index"
       v-bind:style="{color: `hsl(120, 0%, ${100 - index * 10}%)`}">{{activity}}</p>
  </div>
</template>

<script>
export default {
  name: 'History',
  props: {
    history: Array
  }
}
</script>

<style>
.history {
  grid-area: history;
}
</style>
