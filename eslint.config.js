const cypress = require('eslint-plugin-cypress')
const prettier = require('eslint-plugin-prettier/recommended')
const js = require('@eslint/js')
const globals = require('globals')

const cleanGlobals = (obj) => {
  const result = {}
  for (const key in obj) {
    if (obj[key] === true || obj[key] === 'writable') result[key] = 'writable'
    else result[key] = 'readonly'
  }
  return result
}

module.exports = [
  js.configs.recommended,
  {
    plugins: {
      cypress: cypress
    },
    languageOptions: {
      globals: {
        ...cleanGlobals(globals.browser),
        ...cleanGlobals(globals.node),
        ...cleanGlobals(cypress.configs.recommended.languageOptions.globals),
        updateCartCount: 'readonly'
      }
    },
    rules: {
      ...cypress.configs.recommended.rules,
      'no-unused-vars': 'warn',
      'cypress/no-unnecessary-waiting': 'warn'
    }
  },
  prettier,
  {
    ignores: [
      'node_modules/**',
      'allure-results/**',
      'allure-report/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
      'package-lock.json',
      'public/js/index.js',
      'public/js/product.js'
    ]
  }
]
