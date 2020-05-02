<template>
  <div>
    <div class="container my-m">
      <h2 class="header-text my-s">新規登録</h2>

      <formInput
        v-model="formUserName.input"
        :content="formUserName"
        :error-message="validateUserName"
      ></formInput>
      <formInput
        v-model="formEmail.input"
        :error-message="validateEmail"
        :content="formEmail"
      ></formInput>
      <formInput
        v-model="formPassword.input"
        :error-message="validatePassword"
        :content="formPassword"
      ></formInput>

      <div class="has-text-centered mt-s">
        <button
          class="button is-info is-outlined"
          :disabled="!isEnableRegister"
          @click="register"
        >
          新規登録
        </button>
      </div>

      <div class="has-text-centered">
        <nuxt-link to="/" class="has-text-info login-link">
          ログインはこちら
        </nuxt-link>
      </div>
      <div class="register-fail mb-l">
        <p v-if="isRegisterFailed" class="has-text-danger">
          登録に失敗しました。入力内容をご確認ください。
        </p>
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
      },
      isRegisterFailed: false
    }
  },
  computed: {
    // 全ての入力値が正しい場合にtrueを返す
    isEnableRegister() {
      return (
        !this.validateUserName && !this.validateEmail && !this.validatePassword
      )
    },
    // 新規登録するユーザ名が条件を満たしていないエラー文字列を返す
    validateUserName() {
      return this.formUserName.input.length > 3
        ? ''
        : '4文字以上入力してください'
    },
    // 新規登録するEmailアドレスが条件を満たした場合にtrueを返す
    validateEmail() {
      const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regexEmail.test(this.formEmail.input)
        ? ''
        : '有効なEmailアドレスを入力してください'
    },
    // 新規登録するユーザ名が条件を満たした場合にtrueを返す
    validatePassword() {
      return this.formPassword.input.length > 5
        ? ''
        : '6文字以上入力してください'
    }
  },
  methods: {
    async register() {
      try {
        const response = await this.$axios.$post(
          '/accounts:signUp?key=' + process.env.API_KEY,
          {
            email: this.formEmail.input,
            password: this.formPassword.input,
            returnSecureToken: true
          }
        )

        this.$axios.$post('accounts:update?key=' + process.env.API_KEY, {
          idToken: response.idToken,
          displayName: this.formUserName.input,
          returnSecureToken: true
        })
        this.isRegisterFailed = false
      } catch (error) {
        this.isRegisterFailed = true
      }
    }
  }
}
</script>

<style scoped>
.login-link {
  font-size: 14px;
}
.register-fail {
  position: relative;
}
.register-fail p {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
