<template>
  <button class="delete" aria-label="close" @click="clickClose"></button>
</template>

<script>
export default {
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>
