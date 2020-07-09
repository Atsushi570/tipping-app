<template>
  <div :class="'basics-align-' + (align || 'center')">
    <button
      :class="['button', colors || 'is-primary', size || 'is-normal']"
      :Disabled="disable"
      @click="clickHandler"
    >
      <slot>
        <span :style="spaceArround">
          {{ btnText }}
        </span>
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    align: String,
    btnText: String,
    colors: String,
    size: String,
    disable: Boolean
  },
  computed: {
    spaceArround() {
      const space = this.size === 'is-small' ? '8px' : '16px'
      return (
        /* sizeがsmallだと8pxのpadding */
        `padding-left:${space}; padding-right:${space}`
      )
    }
  },
  methods: {
    clickHandler(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  @extend %block;
}
</style>
