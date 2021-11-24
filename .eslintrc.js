module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    '@z3k/eslint-config-zk'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
  }
}
