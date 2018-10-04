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
// const { version } = require('../../package.json')
import { version } from '../../package.json'
export default {
  name: 'Settings',
  data: () => ({ version }),
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
    }
  }
}
</script>

<style lang="scss">

.spanlink {
  padding-right: 6px;
  cursor: pointer;
}
.spanlink:hover {
  color: white;
}

</style>
