// import globals from 'globals'
// import jsPlugin from '@eslint/js'
// import stylistic from '@stylistic/eslint-plugin'
//
// export default [
//   stylistic.configs.recommended,
//   jsPlugin.configs.recommended,
//   {
//     files: ['**/*.js', '**/*.jsx'],
//   },
//   {
//     ignores: ['dist/'],
//   },
//   {
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//         ...globals.es2021,
//       },
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     rules: {
//       'no-console': 'off',
//     },
//   },
// ]
import globals from 'globals'
import jsPlugin from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'

export default [
  stylistic.configs.recommended,
  jsPlugin.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-console': 'off',
      // Правила из плагина react, например:
      'react/react-in-jsx-scope': 'off', // если используешь React 17+ без импорта React
      'react/jsx-uses-react': 'off', // тоже для нового JSX трансформа
      'react/jsx-uses-vars': 'error', // помечать JSX компоненты как используемые
    },
  },
  {
    ignores: ['dist/'],
  },
]
