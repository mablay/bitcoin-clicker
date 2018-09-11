<template>
  <div class="view history">
    <h2>History</h2>
    <transition-group name="history-list" tag="p">
      <p v-for="(activity, index) in history"
         :key="activity.id"
         class="history-record"
         v-bind:style="{color: `hsl(120, 0%, ${100 - index * 10}%)`}">{{activity.msg}}</p>
    </transition-group>
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

.history-record {
  transition: all 1s;
  display: inline-block;
  width: 100%;
  margin: 8px 0 8px 0;
}

.history-list-enter-active {
  transition: all 1s;
}
.history-list-leave-active {
  transition: all 0.5s;
}
.history-list-enter, .history-list-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

</style>
