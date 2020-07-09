<template>
  <div>
    <input
      :class="['input', colors || '', size || 'is-normal']"
      :placeholder="placeholder"
      :style="spaceLeft"
      :value="value"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    colors: String,
    placeholder: String,
    size: String,
    value: String
  },
  computed: {
    spaceLeft() {
      const space = this.size === 'is-small' ? '8px' : '16px'
      return (
        /* sizeがsmallだと8pxのpadding */
        `padding-left:${space};`
      )
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  @extend %block;
}
</style>
