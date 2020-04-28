<template>
  <div>
    <div class="container my-m">
      <h2 class="header-text">新規登録</h2>

      <formInput :data="formUserName"></formInput>
      <formInput :data="formEmail"></formInput>
      <formInput :data="formPassword"></formInput>

      <div class="has-text-centered mt-s">
        <button class="button is-info is-outlined">新規登録</button>
      </div>

      <div class="has-text-centered">
        <nuxt-link to="/" class="has-text-info login-link">
          ログインはこちら
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import formInput from '~/components/formInput.vue'

export default {
  components: { formInput },
  data() {
    return {
      formUserName: {
        label: 'ユーザ名',
        type: 'text',
        placeHolder: 'Your Name'
      },
      formEmail: {
        label: 'メールアドレス',
        type: 'Email',
        placeHolder: 'your.email@example.com'
      },
      formPassword: {
        label: 'パスワード',
        type: 'password',
        placeHolder: 'Passwrod'
      }
    }
  }
}
</script>

<style scoped>
.login-link {
  font-size: 14px;
}
</style>
