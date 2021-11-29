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
    ecmaVersion: 2021
  },
  rules: {
    'no-return-assign': ['off'],
    'no-undef': ['off'],
    'no-unused-vars': ['off']
  }
}
