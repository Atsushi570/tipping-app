<template>
  <div>
    <div class="container my-m">
      <h2 class="header-text">ログイン画面</h2>

      <formInput v-model="formEmail.input" :content="formEmail"></formInput>
      <formInput
        v-model="formPassword.input"
        :content="formPassword"
      ></formInput>

      <div class="has-text-centered mt-s">
        <button class="button is-info is-outlined" @click="logIn">
          ログイン
        </button>
      </div>

      <div class="has-text-centered">
        <nuxt-link to="/register" class="has-text-info register-link">
          新規登録はこちら
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import formInput from '~/components/formInput.vue'

export default {
  components: { formInput },
  model: {
    event: 'input'
  },
  data() {
    return {
      formEmail: {
        label: 'メールアドレス',
        type: 'Email',
        placeHolder: 'your.email@example.com',
        input: ''
      },
      formPassword: {
        label: 'パスワード',
        type: 'password',
        placeHolder: 'Passwrod',
        input: ''
      }
    }
  },
  methods: {
    logIn() {
      this.$axios.$post(
        '/accounts:signInWithPassword?key=' + process.env.API_KEY,
        {
          email: this.formEmail.input,
          password: this.formPassword.input,
          returnSecureToken: true
        }
      )
    }
  }
}
</script>

<style scoped>
.register-link {
  font-size: 14px;
}
</style>
