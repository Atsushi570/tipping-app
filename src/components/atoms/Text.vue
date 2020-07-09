<template>
  <component
    :is="level || 'p'"
    :noSpace="noSpace"
    :class="[
      'text',
      'basics-font-size-space-' +
        (level === 'p' || level === 'label' ? fontSize || 'middle' : level),
      'basics-font-color-' + (fontColor || 'black'),
      'basics-align-' + (align || 'center')
    ]"
  >
    {{ text }}
  </component>
</template>

<script>
export default {
  props: {
    level: String,
    noSpace: Boolean,
    fontSize: String,
    fontColor: String,
    align: String,
    text: String
  },
  computed: {
    leftSpace() {
      return (
        'padding-left: ' + (this.fontSize === 'small' ? '8px' : '16px') + ';'
      )
    },
    rightSpace() {
      return (
        'padding-right: ' + (this.fontSize === 'small' ? '8px' : '16px') + ';'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  &[noSpace] {
    padding-bottom: 0;
  }
}
</style>
