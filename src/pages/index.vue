<template>
  <div>
    <div class="container my-m">
      <h2 class="header-text">ログイン画面</h2>

      <div class="form-wrapper">
        <div class="columns is-desktop">
          <div class="field column is-6 is-offset-3">
            <label class="label">ユーザ名</label>
            <p class="control">
              <input class="input" type="text" placeholder="Your Name" />
            </p>
          </div>
        </div>

        <div class="columns is-desktop">
          <div class="field column is-6 is-offset-3">
            <label class="label">メールアドレス</label>
            <p class="control">
              <input
                class="input"
                type="email"
                placeholder="your.email.address@example.com"
              />
            </p>
          </div>
        </div>

        <div class="columns is-desktop">
          <div class="field column is-6 is-offset-3">
            <label class="label">パスワード</label>
            <p class="control">
              <input class="input" type="password" placeholder="Password" />
            </p>
          </div>
        </div>

        <div class="has-text-centered">
          <button class="button is-info is-outlined">ログイン</button>
        </div>

        <div class="has-text-centered">
          <a class="has-text-info register-link" href="">新規登録はこちら</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.register-link {
  font-size: 14px;
}
</style>
