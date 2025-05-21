module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-underscore-dangle': ['error', { allow: ['__filename', '__dirname'] }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'testing-library/no-debug': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
  },
  ignorePatterns: ['dist/', 'build/', 'node_modules/'],
  overrides: [
    {
      files: ['vite.config.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
