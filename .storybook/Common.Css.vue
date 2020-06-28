<template>
  <div class="decorator">
    <slot name="story"></slot>
  </div>
</template>

<script>
export default {
  name: 'CommonCss'
}
</script>

<style lang="scss">
@import '~bulma/bulma';
</style>
