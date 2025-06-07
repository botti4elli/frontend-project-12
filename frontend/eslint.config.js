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
// import js from '@eslint/js'
// import reactPlugin from 'eslint-plugin-react'
// import reactHooksPlugin from 'eslint-plugin-react-hooks'
// import globals from 'globals'
// import babelParser from '@babel/eslint-parser'
// import stylisticPlugin from '@stylistic/eslint-plugin'
//
// export default [
//   // 1. Игнорируем стандартные папки
//   {
//     ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
//   },
//
//   // 2. Рекомендуемые базовые правила JS от @eslint/js
//   js.configs.recommended,
//
//   // 3. Правила и настройки для React и JSX файлов
//   {
//     // Обязательно укажи, к каким файлам применять этот конфиг
//     files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
//
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//
//       // Парсер Babel с поддержкой React (JSX)
//       parser: babelParser,
//       parserOptions: {
//         requireConfigFile: false,
//         babelOptions: {
//           presets: ['@babel/preset-react'],
//         },
//       },
//
//       globals: {
//         ...globals.browser,
//         ...globals.es2021,
//       },
//     },
//
//     plugins: {
//       react: reactPlugin,
//       'react-hooks': reactHooksPlugin,
//       '@stylistic': stylisticPlugin,
//     },
//
//     settings: {
//       react: {
//         version: 'detect', // Автоопределение версии React
//       },
//     },
//
//     rules: {
//       'react/prop-types': 'off',
//       'react/react-in-jsx-scope': 'off',
//       'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'error',
//       'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
//       '@stylistic/semi': ['error', 'never'],
//       'no-console': 'off',
//       'no-param-reassign': 'off',
//       'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//       'import/extensions': 'off',
//       'import/no-unresolved': 'off',
//     },
//   },
// ]
// import js from '@eslint/js'
// import reactPlugin from 'eslint-plugin-react'
// import reactHooksPlugin from 'eslint-plugin-react-hooks'
// import globals from 'globals'
// import babelParser from '@babel/eslint-parser'
// import stylisticPlugin from '@stylistic/eslint-plugin'
//
// export default [
//   {
//     ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**']
//   },
//
//   js.configs.recommended,
//
//   {
//     languageOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//       parser: babelParser,
//       parserOptions: {
//         requireConfigFile: false,
//         babelOptions: {
//           presets: ['@babel/preset-react']
//         }
//       },
//       globals: {
//         ...globals.browser,
//         ...globals.es2021
//       }
//     },
//     plugins: {
//       react: reactPlugin,
//       'react-hooks': reactHooksPlugin,
//       '@stylistic': stylisticPlugin
//     },
//     settings: {
//       react: {
//         version: 'detect'
//       }
//     },
//     rules: {
//       // Приоритетные стилистические правила @stylistic
//       '@stylistic/semi': ['error', 'never'],
//       '@stylistic/quotes': ['error', 'single'],
//       '@stylistic/indent': ['error', 2],
//       '@stylistic/no-trailing-spaces': 'error',
//       '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
//       '@stylistic/comma-dangle': ['error', 'never'],
//       '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
//       '@stylistic/object-curly-spacing': ['error', 'always'],
//       '@stylistic/space-before-blocks': ['error', 'always'],
//       '@stylistic/space-in-parens': ['error', 'never'],
//       '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
//
//       // Отключаем конфликтующие стандартные правила
//       semi: 'off',
//       quotes: 'off',
//       indent: 'off',
//       'no-trailing-spaces': 'off',
//       'brace-style': 'off',
//       'comma-dangle': 'off',
//       'keyword-spacing': 'off',
//       'object-curly-spacing': 'off',
//       'space-before-blocks': 'off',
//       'space-in-parens': 'off',
//       'arrow-spacing': 'off',
//
//       // React-правила
//       'react/prop-types': 'off',
//       'react/react-in-jsx-scope': 'off',
//       'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//       'react-hooks/rules-of-hooks': 'error',
//       'react-hooks/exhaustive-deps': 'error',
//
//       // Другие правила
//       'no-console': 'off',
//       'no-param-reassign': 'off',
//       'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//       'import/extensions': 'off',
//       'import/no-unresolved': 'off'
//     }
//   }
// ]
import globals from 'globals'
import jsPlugin from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  stylistic.configs.recommended,
  jsPlugin.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
  },
  {
    ignores: ['dist/'],
  },
  {
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
      // Добавь или отключи нужные правила
      'no-console': 'off',
    },
  },
]
