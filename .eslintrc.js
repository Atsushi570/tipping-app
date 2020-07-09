module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // prettierと干渉するeslintのルールを無効化
    'plugin:vue/essential',
    'prettier/vue', // prettierと干渉するeslint-plugin-vueのルールを無効化
  ],
  plugins: ['vue'], // vueファイルをlint対象に指定

  // add your custom rules here
  rules: {
    "no-undef": "off",
    'prettier/prettier': [
      'error',
      {
        htmlWhitespaceSensitivity: 'ignore'
      }
    ]
  }
}
