<template>
  <table class="table is-fullwidth is-hoverable">
    <thead>
      <tr><TextAtom text="ユーザ名" /></tr>
      <tr></tr>
    </thead>
    <tbody v-for="(user, uidOfUsers) in users" :key="uidOfUsers">
      <UserRow
        v-if="uid != uidOfUsers"
        :uid="uidOfUsers"
        :user-name="user.displayName"
        size="is-normal"
        display-btn-text="walletを見る"
        tipping-btn-text="送る"
        @displayModal="displayModal"
      />
    </tbody>
  </table>
</template>

<script>
import Text from '~/components/atoms/Text'
import UserRow from '~/components/molecules/UserRow'
export default {
  components: {
    TextAtom: Text,
    UserRow
  },
  props: {
    users: Object,
    uid: String
  },
  methods: {
    displayModal({ uid, type }) {
      this.$emit('displayModal', { uid, type })
    }
  }
}
</script>
