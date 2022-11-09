module.exports = {
    env: {
        browser: true,
        es6: true,
        'jest/globals': true,
    },
    extends: ['airbnb', 'plugin:prettier/recommended'],
    ignorePatterns: ['**/build', '**/node_modules', '**/dist'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        babelConfig: {
            configFile: './babel.config.cjs',
        },
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
            modules: true,
        },
        ecmaVersion: 8,
        requireConfigFile: false,
        sourceType: 'module',
    },
    plugins: ['jest', 'react-hooks', 'prettier'],
    rules: {
        'arrow-body-style': 'off',
        'arrow-parens': 'off',
        camelcase: 'off',
        'comma-dangle': 'off',
        'import/no-cycle': 'warn',
        'global-require': 'off',
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/no-unresolved': 0,
        'import/no-useless-path-segments': 'off',
        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/href-no-hash': 'off',
        'jsx-a11y/interactive-supports-focus': 'warn',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'warn',
        'jsx-a11y/no-static-element-interactions': 'off',
        'lines-between-class-members': 'warn',
        'max-classes-per-file': ['error', 2],
        'no-confusing-arrow': 'off',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-mixed-operators': 'off',
        'no-multi-assign': 'off',
        'no-nested-ternary': 'off',
        'no-param-reassign': 'off',
        'no-restricted-globals': 'warn',
        'no-underscore-dangle': 'off',
        'no-use-before-define': 'off',
        'object-curly-newline': 'off',
        'prefer-destructuring': 'warn',
        'prefer-promise-reject-errors': 'warn',
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'avoid',
                overrides: [
                    {
                        files: ['*.json', '.travis.yml'],
                        options: {
                            tabWidth: 2,
                            singleQuote: false,
                        },
                    },
                ],
                printWidth: 100,
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'es5',
            },
        ],
        'react-hooks/exhaustive-deps': 'off',
        'react-hooks/rules-of-hooks': 'warn',
        'react/destructuring-assignment': ['warn', 'always', { ignoreClassFields: true }],
        'react/forbid-prop-types': ['off'],
        'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
        'react/jsx-fragments': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': ['off'],
        'react/jsx-no-bind': 'off',
        'react/jsx-no-duplicate-props': ['error', { ignoreCase: false }],
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-uses-react': 2,
        'react/no-access-state-in-setstate': 'warn',
        'react/no-array-index-key': 'off',
        'react/no-deprecated': 0,
        'react/no-did-update-set-state': 'off',
        'react/no-unused-prop-types': 'off',
        'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],
        'react/prop-types': 'off',
        'react/state-in-constructor': 'off',
    },
    settings: {
        'import/resolver': {
            webpack: `${__dirname}/webpack/resolve.config.js`,
        },
    },
};