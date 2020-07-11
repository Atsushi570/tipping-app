<template>
  <div v-if="users[uid]">
    <div class="columns">
      <div
        class="column is-12-mobile is-10-tablet is-8-desktop is-offset-2-desktop is-offset-1-tablet"
      >
        <div class="welcomeMessage">
          <TextAtom
            :text="`${users[uid].displayName}さんようこそ！！！`"
            font-size="middle"
            level="p"
          />
          <TextAtom
            :text="`残高 : ${users[uid].wallet}`"
            font-size="middle"
            level="p"
          />
          <Button
            colors="is-info"
            btn-text="ログアウト"
            level="p"
            :disable="disableTippingButton"
            :is-outlined="true"
            @click="clickLogout"
          ></Button>
        </div>
        <UserTable
          :users="users"
          :uid="uid"
          @displayModal="displayModal"
        ></UserTable>
      </div>
    </div>

    <Modal
      v-if="modal.isActive"
      :is-active="modal.isActive"
      :disableTippingButton="disableTippingButton"
      :title-text="modalTitle"
      :modal-type="modal.type"
      @clickClose="closeModal"
    >
      <TextAtom
        v-if="modal.type === 'wallet'"
        align="center"
        level="p"
        :text="this.selectedUser.wallet.toString()"
      ></TextAtom>
      <TextInput
        class="tipping-value"
        v-if="modal.type === 'tipping'"
        @input="updateTippingValue"
      ></TextInput>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Button from '~/components/atoms/Button'
import Text from '~/components/atoms/Text'
import TextInput from '~/components/atoms/TextInput'
import UserTable from '~/components/organisms/UserTable'
import Modal from '~/components/molecules/Modal'

export default {
  async fetch({ store }) {
    await store.dispatch('firestore/watchDoc')
  },
  components: {
    Button,
    TextAtom: Text,
    TextInput,
    UserTable,
    Modal
  },
  data() {
    return {
      tippingValue: '',
      selectedUser: null,
      modal: {
        isActive: false,
        type: ''
      }
    }
  },
  computed: {
    // ログイン中のユーザのuid
    ...mapGetters('auth', ['uid']),
    // firestoreに登録されている全ユーザの情報
    ...mapGetters('firestore', ['users']),
    // ModalのTitleを表示するModalによって切り替える
    modalTitle() {
      return this.modal.type === 'wallet'
        ? `${this.selectedUser.displayName}さんの残高`
        : '送る金額'
    },
    // tippingValueが1以上の整数の場合にtrueを返す
    disableTippingButton() {
      const numberTippingValue = Number(this.tippingValue)
      const isValidInput =
        Number.isInteger(numberTippingValue) && numberTippingValue > 0

      return this.modal.type === 'tipping' && !isValidInput
    }
  },
  // Vueインスタンスが削除されるときにFirebaseの購読を停止する
  destroyed() {
    this.unsubscribe()
  },
  methods: {
    ...mapActions('firestore', ['unsubscribe']),
    // 子コンポーネントから操作対象のユーザのuidと表示するModalのtypeを受け取る
    displayModal({ uid, type }) {
      this.modal.type = type
      this.selectedUser = this.users[uid]
      this.modal.isActive = true
    },
    closeModal() {
      this.modal.isActive = false
    },
    updateTippingValue(value) {
      this.tippingValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 10vw 0;
}
.welcomeMessage {
  display: flex;
  justify-content: space-between;
}
.tipping-value {
  padding: 0 10%;
}
</style>
