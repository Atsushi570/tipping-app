<template>
  <div>
    <div class="container my-m">
      <h2 class="header-text">新規登録</h2>

      <formInput
        v-model="formUserName.input"
        :content="formUserName"
      ></formInput>
      <formInput v-model="formEmail.input" :content="formEmail"></formInput>
      <formInput
        v-model="formPassword.input"
        :content="formPassword"
      ></formInput>

      <div class="has-text-centered mt-s">
        <button class="button is-info is-outlined" @click="register">
          新規登録
        </button>
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
        placeHolder: 'Your Name',
        input: ''
      },
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
    register() {
      this.$axios
        .$post('/accounts:signUp?key=' + process.env.API_KEY, {
          email: this.formEmail.input,
          password: this.formPassword.input,
          returnSecureToken: true
        })
        .then((response) => {
          this.$axios.$post('accounts:update?key=' + process.env.API_KEY, {
            idToken: response.idToken,
            displayName: this.formUserName.input,
            returnSecureToken: true
          })
        })
    }
  }
}
</script>

<style scoped>
.login-link {
  font-size: 14px;
}
</style>
