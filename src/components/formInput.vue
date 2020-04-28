<template>
  <div class="form-wrapper">
    <div class="columns is-desktop">
      <div class="field column is-6 is-offset-3">
        <label class="label">{{ data.label }}</label>
        <p class="control">
          <input
            class="input"
            :type="data.type"
            :placeholder="data.placeHolder"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true,
      type: Object
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
