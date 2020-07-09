<template>
  <tr>
    <td><TextAtom :text="userName" /></td>
    <td>
      <div class="buttons">
        <Button
          :btn-text="displayBtnText"
          @click="displayModal('wallet')"
          :size="size"
        />
        <Button
          :btn-text="tippingBtnText"
          @click="displayModal('tipping')"
          :size="size"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import Text from '~/components/atoms/Text'
import Button from '~/components/atoms/Button'

export default {
  components: {
    TextAtom: Text,
    Button
  },
  props: {
    userName: String,
    displayBtnText: String,
    tippingBtnText: String,
    size: String,
    uid: String
  },
  methods: {
    displayModal(type) {
      this.$emit('displayModal', { uid: this.uid, type })
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  div:first-child {
    margin-right: 10px;
  }
}
</style>
