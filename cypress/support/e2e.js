import 'allure-cypress/commands'
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
