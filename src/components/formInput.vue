<template>
  <div class="form-wrapper">
    <div class="columns is-desktop">
      <div class="field column is-6 is-offset-3">
        <label class="label">{{ content.label }}</label>
        <p class="control">
          <input
            class="input"
            :type="content.type"
            :placeholder="content.placeHolder"
            :value="input"
            @input="$emit('input', $event.target.value)"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style scoped>
.field {
  padding-right: 4vw;
  padding-left: 4vw;
}
</style>
