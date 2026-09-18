import { reactConfig } from 'eslint-config-brunoazevedo'

export default [
  ...reactConfig,

  {
    languageOptions: {
      globals: {
        FormData: 'readonly',
        Blob: 'readonly',
        URLSearchParams: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setImmediate: 'readonly',
        clearImmediate: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        queueMicrotask: 'readonly',
        __DEV__: 'readonly',
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
]
