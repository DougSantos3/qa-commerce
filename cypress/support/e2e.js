import 'allure-cypress'
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})
