module.exports = {
  root: true,
  env: {
    browser: true,
    'jest/globals': true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'jest'
  ],
  // add your custom rules here
  rules: {
    'vue/multi-word-component-names': 'off',
    semi: 0
  }
};
