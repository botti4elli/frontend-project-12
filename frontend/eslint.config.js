// import js from '@eslint/js'
// import globals from 'globals'
// import reactPlugin from 'eslint-plugin-react'
// import stylisticPlugin from '@stylistic/eslint-plugin'
//
// export default [
//     js.configs.recommended,
//     {
//         languageOptions: {
//             ecmaVersion: 'latest',
//             sourceType: 'module',
//             globals: {
//                 ...globals.browser,
//                 ...globals.es2021,
//             },
//         },
//         plugins: {
//             react: reactPlugin,
//             '@stylistic': stylisticPlugin,
//         },
//         rules: {
//             'react/prop-types': 'off',
//             'react/react-in-jsx-scope': 'off',
//             'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//             'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
//
//             '@stylistic/semi': ['error', 'never'],
//
//             'no-console': 'off',
//             'no-param-reassign': 'off',
//             'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//             'import/extensions': 'off',
//             'import/no-unresolved': 'off',
//         },
//     },
// ]
// import js from '@eslint/js'
// import globals from 'globals'
// import reactPlugin from 'eslint-plugin-react'
// import stylisticPlugin from '@stylistic/eslint-plugin'
//
// export default [
//     {
//         ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
//     },
//     js.configs.recommended,
//     {
//         languageOptions: {
//             ecmaVersion: 'latest',
//             sourceType: 'module',
//             globals: {
//                 ...globals.browser,
//                 ...globals.es2021,
//             },
//         },
//         plugins: {
//             react: reactPlugin,
//             '@stylistic': stylisticPlugin,
//         },
//         settings: {
//             react: {
//                 version: 'detect',  // <--- вот здесь указываем
//             },
//         },
//         rules: {
//             'react/prop-types': 'off',
//             'react/react-in-jsx-scope': 'off',
//             'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//             'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
//
//             '@stylistic/semi': ['error', 'never'],
//
//             'no-console': 'off',
//             'no-param-reassign': 'off',
//             'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//             'import/extensions': 'off',
//             'import/no-unresolved': 'off',
//         },
//     },
// ]
// import js from '@eslint/js'
// import globals from 'globals'
// import reactPlugin from 'eslint-plugin-react'
// import stylisticPlugin from '@stylistic/eslint-plugin'
//
// export default [
//     {
//         ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
//     },
//     js.configs.recommended,
//     {
//         files: ['**/*.js', '**/*.jsx'], // <<< ВАЖНО: добавили сюда
//         languageOptions: {
//             ecmaVersion: 'latest',
//             sourceType: 'module',
//             globals: {
//                 ...globals.browser,
//                 ...globals.es2021,
//             },
//         },
//         plugins: {
//             react: reactPlugin,
//             '@stylistic': stylisticPlugin,
//         },
//         settings: {
//             react: {
//                 version: 'detect',
//             },
//         },
//         rules: {
//             'react/prop-types': 'off',
//             'react/react-in-jsx-scope': 'off',
//             'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//             'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
//
//             '@stylistic/semi': ['error', 'never'],
//
//             'no-console': 'off',
//             'no-param-reassign': 'off',
//             'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//             'import/extensions': 'off',
//             'import/no-unresolved': 'off',
//         },
//     },
// // ]
// import js from '@eslint/js'
// import globals from 'globals'
// import reactPlugin from 'eslint-plugin-react'
// import stylisticPlugin from '@stylistic/eslint-plugin'
// import babelParser from '@babel/eslint-parser' // 👈 импорт как объект
// export default [
//     {
//         ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
//     },
//     js.configs.recommended,
//     {
//         files: ['**/*.js', '**/*.jsx'],
//         languageOptions: {
//             ecmaVersion: 'latest',
//             sourceType: 'module',
//             parser: babelParser, // 👈 указываем как объект
//             parserOptions: {
//                 requireConfigFile: false,
//                 babelOptions: {
//                     presets: ['@babel/preset-react'], // не обязательно, но можно
//                 },
//             },
//             globals: {
//                 ...globals.browser,
//                 ...globals.es2021,
//             },
//         },
//         plugins: {
//             react: reactPlugin,
//             '@stylistic': stylisticPlugin,
//         },
//         settings: {
//             react: {
//                 version: 'detect',
//             },
//         },
//         rules: {
//             'react/prop-types': 'off',
//             'react/react-in-jsx-scope': 'off',
//             'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//             'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
//             '@stylistic/semi': ['error', 'never'],
//             'no-console': 'off',
//             'no-param-reassign': 'off',
//             'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//             'import/extensions': 'off',
//             'import/no-unresolved': 'off',
//         },
//     },
// ]
// export default [
//     {
//         ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
//     },
//     js.configs.recommended,
//     {
//         languageOptions: {
//             ecmaVersion: 'latest',
//             sourceType: 'module',
//             parser: babelParser, // <---- ВАЖНО
//             parserOptions: {
//                 requireConfigFile: false,
//                 babelOptions: {
//                     presets: ['@babel/preset-react'],
//                 },
//             },
//             globals: {
//                 ...globals.browser,
//                 ...globals.es2021,
//             },
//         },
//         plugins: {
//             react: reactPlugin,
//             '@stylistic': stylisticPlugin,
//         },
//         settings: {
//             react: {
//                 version: 'detect',
//             },
//         },
//         rules: {
//             'react/prop-types': 'off',
//             'react/react-in-jsx-scope': 'off',
//             'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
//             'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
//             '@stylistic/semi': ['error', 'never'],
//             'no-console': 'off',
//             'no-param-reassign': 'off',
//             'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
//             'import/extensions': 'off',
//             'import/no-unresolved': 'off',
//         },
//     },
// ]
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import stylisticPlugin from '@stylistic/eslint-plugin';
import babelParser from '@babel/eslint-parser';
export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
  },
  js.configs.recommended,
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
      "react": reactPlugin,
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
      '@stylistic/semi': 'error',           // запрещает точку с запятой
      '@stylistic/arrow-parens': ['error', 'as-needed'], // скобки у стрелочных функций с 1 аргументом убрать
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }], // перенос скобок
      '@stylistic/no-trailing-spaces': 'error',           // нет пробелов в конце строк
      '@stylistic/no-multiple-empty-lines': ['error', { max: 0, maxEOF: 0 }], // нет пустых строк подряд
      '@stylistic/indent': ['error', 2],                   // отступ 2 пробела (или 4, если у тебя другой)
      '@stylistic/indent-binary-ops': 'error',             // отступы у бинарных операций
      // "@stylistic/arrow-parens": ["error", "as-needed"],
      // "no-unused-vars": "error",
      "@stylistic/quote-props": ["error", "consistent"],
      // "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": false }],
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      // "@stylistic/semi": ["error", "never"],
      "react-hooks/exhaustive-deps": "off",
      'no-console': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-param-reassign': 'off',
      'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
    },
  },
];
