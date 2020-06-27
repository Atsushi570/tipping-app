<template>
  <component
    :is="level || 'p'"
    :preWrap="preWrap"
    :noSpace="noSpace"
    :class="[
      'text',
      'basics-font-size-space-' +
        (level === 'p' || 'label' ? fontSize || 'middle' : level),
      'basics-font-color-' + (fontColor || 'yellow'),
      'basics-align-' + (align || 'center')
    ]"
  >
    <span>
      <slot>
        <span>{{ text }}</span>
      </slot>
    </span>
  </component>
</template>

<script>
export default {
  props: {
    level: String,
    preWrap: Boolean,
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
  &[preWrap] {
    white-space: pre-wrap;
  }

  &[noSpace] {
    padding-bottom: 0;
  }
}
</style>
