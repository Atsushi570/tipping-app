<template>
  <div>
    <div class="container my-m">
      <h2 class="header-text my-s">ログイン画面</h2>

      <formInput
        v-model="formEmail.input"
        :content="formEmail"
        :error-message="formEmail.errorMessage"
      ></formInput>
      <formInput
        v-model="formPassword.input"
        :content="formPassword"
        :error-message="formPassword.errorMessage"
      ></formInput>

      <div class="has-text-centered mt-s">
        <button class="button is-info is-outlined" @click="login">
          ログイン
        </button>
      </div>

      <div class="has-text-centered">
        <nuxt-link to="/register" class="has-text-info register-link">
          新規登録はこちら
        </nuxt-link>
      </div>
      <div class="login-fail mb-l">
        <p v-if="isLoginFailed" class="has-text-danger">
          入力内容をご確認ください
        </p>
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
        input: '',
        errorMessage: ''
      },
      formPassword: {
        label: 'パスワード',
        type: 'password',
        placeHolder: 'Passwrod',
        input: '',
        errorMessage: ''
      },
      isLoginFailed: false
    }
  },
  methods: {
    // 全ての入力値に不正がない場合はログインpostをサーバに送信する
    // ログインが成功したらdashboardページに遷移する
    // ログインが失敗したらisLoginFailedをtrueにする
    async login() {
      if (this.updateErrorMessage()) {
        const isLoginSuccessed = await this.$store.dispatch('auth/login', {
          email: this.formEmail.input,
          password: this.formPassword.input
        })
        if (isLoginSuccessed) {
          this.$router.push('dashboard')
        } else {
          this.isLoginFailed = !isLoginSuccessed
        }
      }
    },

    // 各入力値が不正である場合にerrorMessageにエラー文を格納する
    // 全ての入力値に不正がない場合はtrueを返す
    updateErrorMessage() {
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      this.formEmail.errorMessage = regexEmail.test(this.formEmail.input)
        ? ''
        : '有効なEmailアドレスを入力してください'

      this.formPassword.errorMessage =
        this.formPassword.input.length > 5 ? '' : '6文字以上入力してください'

      return !this.formEmail.errorMessage && !this.formPassword.errorMessage
    }
  }
}
</script>

<style scoped>
.register-link {
  font-size: 14px;
}
.login-fail {
  position: relative;
}
.login-fail p {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
