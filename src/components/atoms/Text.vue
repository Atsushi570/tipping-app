<template>
  <component
    :is="level || 'p'"
    :class="[
      'basics-font-size-space-' +
        (level === 'p' || level === 'label' ? fontSize || 'middle' : level),
      'basics-font-color-' + (fontColor || 'black'),
      'basics-align-' + (align || 'center')
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    level: String,
    fontSize: String,
    fontColor: String,
    align: String
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
