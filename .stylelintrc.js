module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-standard',
    'stylelint-prettier/recommended',
    'stylelint-config-recess-order'
  ],
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true
  }
}