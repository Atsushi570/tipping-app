<template>
  <div class="form-wrapper">
    <div class="columns is-desktop">
      <div class="field column is-6 is-offset-3">
        <label class="label">
          {{ label }}
          <span class="has-text-danger">{{ errorMessage }}</span>
        </label>
        <p class="control">
          <input
            v-model="input"
            class="input"
            :type="type"
            :placeholder="placeHolder"
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
      required: false,
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    placeHolder: {
      type: String,
      required: true
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
}
.field {
  padding-right: 4vw;
  padding-left: 4vw;
}
</style>
