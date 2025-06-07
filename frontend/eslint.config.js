// import js from '@eslint/js'
// import globals from 'globals'
// import reactPlugin from 'eslint-plugin-react'
// import reactHooksPlugin from 'eslint-plugin-react-hooks'
// import stylisticPlugin from '@stylistic/eslint-plugin'
// import babelParser from '@babel/eslint-parser'
//
// export default [
//   {
//     ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
//   },
//   js.configs.recommended,
//   stylisticPlugin.configs.customize({
//     languageOptions: {
//       parser: babelParser,
//     },
//     rules: {
//       'indent': ['error', 2],
//       'semi': ['error', 'never'],
//       'arrow-parens': ['error', 'as-needed'],
//       'brace-style': ['error', '1tbs'],
//       'quote-props': ['error', 'consistent'],
//       'multiline-ternary': ['error', 'always-multiline'],
//       'no-trailing-spaces': ['error'],
//       'no-multiple-empty-lines': ['error', { max: 0, maxEOF: 0 }],
//       'indent-binary-ops': ['error'],
//       'quotes': ['error', 'single'],
//     },
//   }),
//
//   {
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       parser: babelParser,
//       parserOptions: {
//         requireConfigFile: false,
//         babelOptions: {
//           presets: ['@babel/preset-react'],
//         },
//       },
//       globals: {
//         ...globals.browser,
//         ...globals.es2021,
//       },
//     },
//     plugins: {
//       'react': reactPlugin,
//       'react-hooks': reactHooksPlugin,
//       '@stylistic': stylisticPlugin,
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//     rules: {
//       // React
//       'react/prop-types': 'off',
//       'react/react-in-jsx-scope': 'off',
//       'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//       'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
//       // React Hooks
//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'error',
//       // Common
//       'no-console': 'off',
//       'no-param-reassign': 'off',
//       'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//       'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],
//       // Import
//       'import/extensions': 'off',
//       'import/no-unresolved': 'off',
//     },
//   },
// ]
import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import stylisticPlugin from '@stylistic/eslint-plugin'
import babelParser from '@babel/eslint-parser'

export default [
  // {
  //   ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
  // },

  js.configs.recommended,

  stylisticPlugin.configs.customize({
    languageOptions: {
      parser: babelParser,
    },
    rules: {
      'indent': ['error', 2],
      'semi': ['error', 'never'],
      'arrow-parens': ['error', 'as-needed'],
      'brace-style': ['error', '1tbs'],
      'quote-props': ['error', 'consistent'],
      'multiline-ternary': ['error', 'always-multiline'],
      'no-trailing-spaces': ['error'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'indent-binary-ops': ['error'],
      'quotes': ['error', 'single'],
    },
  }),

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@stylistic': stylisticPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^React$' }],
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
    },
  },
]
