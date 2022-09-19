module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['solid'],
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:solid/typescript'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
