module.exports = {
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    '@react-native',
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
  ],
  rules: {
    // ...
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'comma-dangle': 0,
    indent: ['error', 2],
    'no-tabs': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-props-no-spreading': 0,
    'max-len': [
      'error',
      {
        code: 300,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
