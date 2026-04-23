import 'allure-cypress'
import './commands'

Cypress.on('uncaught:exception', () => {
  return false
})

before(() => {
  cy.task('seedAdmin')
})
