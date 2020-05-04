<template>
  <div>hello {{ displayName }}</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // ログインしていない場合はログイン画面に戻る
  middleware: ['beforeEnter/loginGuard'],
  computed: {
    ...mapState('auth', ['displayName'])
  }
}
</script>
