<template>
  <div class="container-fluid settings">
    <h3>Settings</h3>
    <div class="row">
      <div class="col-6">Theme</div>
      <div class="col-6">
        <span
          class="spanlink"
          @click="setTheme('light')">&#9728;
        </span>
        <span
          class="spanlink"
          @click="setTheme('dark')">&#9790;
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-6">Version</div>
      <div class="col-6">v{{ version }}</div>
    </div>
    <div class="row">
      <div class="col-6">Sound</div>
      <div class="col-6"><input
        v-model="sound"
        type="checkbox"
        @click="toggleSound">
      </div>
    </div>
    <div class="row">
      <div class="col-6">Permit Google analytics</div>
      <div class="col-6"><input
        type="checkbox"
        checked="checked"
        @click="toggleTracking">
      </div>
    </div>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { version } from '../../package.json'
export default {
  name: 'Settings',
  data: () => ({ version }),
  computed: {
    sound: {
      get () {
        return this.$store.state.game.sound
      },
      set (value) {
        // console.log(value)
        this.$store.commit('setSound', value)
      }
    }
  },
  methods: {
    ...mapMutations(['setTheme']),
    toggleTracking ({ target }) {
      if (target.checked) {
        this.$ga.enable()
        console.log('[GA] ENABLED')
      } else {
        this.$ga.disable()
        console.log('[GA] DISABLED')
      }
    },
    toggleSound ({ target }) {
      console.log('sound', target.checked)
    }
  }
}
</script>

<style lang="scss">

.spanlink {
  padding-right: 12px;
  cursor: pointer;
}
.spanlink:hover {
  color: white;
}

</style>
