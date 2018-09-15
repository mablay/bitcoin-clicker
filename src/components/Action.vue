<template>
  <button class="btn btn-action"
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
    context: {
      type: String,
      default: ''
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

<style lang="scss">
@import '../styles/themes.scss';
.btn-action {
  cursor: pointer;
  margin-bottom: 12px;
  width: 80%;
  font-size: 20px;
  /* background-color: lightblue; */
  padding: 12px;
  outline: 0;
  border-radius: 9px;
  border: none;
  font-weight: 400;
  border: 2px solid grey;
  @include themify($themes) {
    // color: #202020;
    color: themed('textColor');
    background-color: themed('backgroundColor');
  }

  /* background: linear-gradient(to right, white 50%, grey 50%) */
}
.btn-action:focus {
  @include themify($themes) {
    border: themed('buttonBorderFocus');
    box-shadow: 0px 0px 16px skyblue;
  }
}
.btn-action.disabled {
  color: lightgrey;
}
</style>
