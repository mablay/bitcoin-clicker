<template>
  <button class="btn-action"
          v-on:click="trigger()"
          v-bind:style="{ background: `linear-gradient(to left, white ${this.progress}% , SILVER ${this.progress}% )` }"
          v-bind:class="{ disabled: !enabled }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Action',
  props: {
    duration: {
      type: Number,
      default: 1000
    },
    enabled: {
      type: Boolean,
      default: true
    },
    action: Function
  },
  data () {
    return {
      millis: this.duration
    }
  },
  computed: {
    progress: function () {
      return 100 * this.millis / this.duration
    }
  },
  methods: {
    trigger () {
      if (!this.enabled) return
      if (this.millis >= this.duration) { this.millis = 0 }
      if (this.millis === 0) {
        this.action(this)
      }
    }
  }
}
</script>

<style>
.btn-action {
  margin-bottom: 12px;
  width: 80%;
  font-size: 20px;
  /* background-color: lightblue; */
  padding: 12px;
  outline: 0;
  border-radius: 9px;
  border: none;
  color: #202020;
  font-weight: 400;
  border: 2px solid grey;
  /* background: linear-gradient(to right, white 50%, grey 50%) */
}
.btn-action:focus {
  border: solid 2px grey;
  box-shadow: 0px 0px 16px skyblue;
}
.btn-action.disabled {
  color: lightgrey;
}
</style>
