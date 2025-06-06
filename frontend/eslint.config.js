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
import js from '@eslint/js'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import stylisticPlugin from '@stylistic/eslint-plugin'

export default [
    {
        ignores: ['node_modules/**', 'dist/**', 'build/**', 'assets/**'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            react: reactPlugin,
            '@stylistic': stylisticPlugin,
        },
        settings: {
            react: {
                version: 'detect',  // <--- вот здесь указываем
            },
        },
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],
            'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],

            '@stylistic/semi': ['error', 'never'],

            'no-console': 'off',
            'no-param-reassign': 'off',
            'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
            'import/extensions': 'off',
            'import/no-unresolved': 'off',
        },
    },
]
