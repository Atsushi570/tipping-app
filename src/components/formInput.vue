<template>
  <div class="form-wrapper">
    <div class="columns is-desktop">
      <div class="field column is-6 is-offset-3">
        <label class="label">
          {{ content.label }}
          <span>{{ errorMessage }}</span>
        </label>
        <p class="control">
          <input
            v-model="input"
            class="input"
            :type="content.type"
            :placeholder="content.placeHolder"
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
    },
    errorMessage: {
      required: true,
      type: String
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
.label span {
  margin-left: 10px;
  font-size: 12px;
  font-weight: normal;
  color: red;
}
.field {
  padding-right: 4vw;
  padding-left: 4vw;
}
</style>
