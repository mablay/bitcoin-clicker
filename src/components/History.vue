<template>
  <div class="view history">
    <h4>History</h4>
    <transition-group
      class="content"
      name="history-list"
      tag="p">
      <p
        v-for="(activity, index) in history"
        :key="activity.id"
        :style="{color: `hsl(120, 0%, ${foreground + (background - foreground) * index / 10}%)`}"
        class="history-record">{{ activity.msg }}</p>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'History',
  computed: mapState({
    history: state => state.game.history,
    foreground: state => state.game.theme === 'light' ? 0 : 100,
    background: state => {
      // console.log('background', state.game.theme)
      return state.game.theme === 'light' ? 100 : 0
    }
  })
}
</script>

<style lang="scss">
.history {
  grid-area: history;
  .content {
    text-align: left;
  }
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
