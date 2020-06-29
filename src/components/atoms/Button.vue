<template>
  <div>
    <button
      :class="['button', colors || 'is-primary', size || 'is-normal']"
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
    btnText: String,
    colors: String,
    size: String
  },
  computed: {
    spaceArround() {
      const space = this.fontSize === 'small' ? '8px' : '16px'
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
