<template>
  <div>
    <button
      :class="['button', colors ? colors : 'is-primary']"
      @click="clickHandler"
    >
      <slot>
        <span class="test">test</span>
        {{ btnText }}
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    btnText: String,
    colors: String
  },
  methods: {
    clickHandler(event) {
      this.$emit('click', event)
    }
  }
}
</script>
