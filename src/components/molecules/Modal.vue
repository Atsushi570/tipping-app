<template>
  <div class="modal" :class="{ 'is-active': isActive }">
    <div class="modal-background" @click="clickClose"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <TextAtom
          class="modal-card-title"
          :no-space="true"
          align="center"
          level="p"
          :text="titleText"
        ></TextAtom>
        <CloseButton @clickClose="clickClose"></CloseButton>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <Button
          colors="is-danger"
          btn-text="Cancel"
          level="p"
          @click="clickClose"
        ></Button>
      </footer>
    </div>
  </div>
</template>

<script>
import Text from '~/components/atoms/Text'
import Button from '~/components/atoms/Button'
import CloseButton from '~/components/atoms/CloseButton'

export default {
  components: {
    TextAtom: Text,
    Button,
    CloseButton
  },
  props: {
    isActive: Boolean,
    titleText: String,
    bodyText: String
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  width: auto;
  .modal-card-title {
    margin: 0 2vw;
  }
  .delete {
    transform: translate(10px, -15px);
  }
  .modal-card-foot [level='p'] {
    margin-left: auto;
  }
}
</style>
