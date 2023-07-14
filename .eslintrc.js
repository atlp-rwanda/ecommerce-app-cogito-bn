module.exports = {
  ignorePatterns: ['database/migrations/*'],
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    sequelize: true,
  },
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
  },
};
