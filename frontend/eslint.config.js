// import globals from 'globals'
// import jsPlugin from '@eslint/js'
// import stylistic from '@stylistic/eslint-plugin'
// import reactPlugin from 'eslint-plugin-react'
// import reactHooksPlugin from 'eslint-plugin-react-hooks'
// import reactRefreshPlugin from 'eslint-plugin-react-refresh'
//
// /** @type {import('eslint').Linter.FlatConfig[]} */
// export default [
//   stylistic.configs.recommended,
//   jsPlugin.configs.recommended,
//
//   {
//     ignores: ['dist/**', 'sourceMaps/**'],
//   },
//
//   {
//     files: ['**/*.{js,jsx}'],
//     plugins: {
//       'react': reactPlugin,
//       'react-hooks': reactHooksPlugin,
//       'react-refresh': reactRefreshPlugin,
//     },
//     languageOptions: {
//       globals: {
//         ...globals.browser,
//         ...globals.node,
//         ...globals.es2021,
//       },
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     rules: {
//       ...jsPlugin.configs.recommended.rules,
//       ...reactPlugin.configs.recommended.rules,
//       ...reactHooksPlugin.configs.recommended.rules,
//
//       'react-refresh/only-export-components': 'warn',
//       'react/prop-types': 'off',
//       'no-console': 'off',
//       'react/react-in-jsx-scope': 'off',
//
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//   },
//
//   {
//     files: ['upload-source-maps.js'],
//     languageOptions: {
//       globals: {
//         ...globals.node,
//       },
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//       },
//     },
//   },
// ]
import globals from 'globals'
import jsPlugin from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
// import reactRefreshConfig from 'eslint-plugin-react-refresh/config'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  stylistic.configs.recommended,
  jsPlugin.configs.recommended,

  {
    ignores: ['dist/**', 'sourceMaps/**'],
  },

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...jsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,

      'react-refresh/only-export-components': 'warn',
      'react/prop-types': 'off',
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['upload-source-maps.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
]
