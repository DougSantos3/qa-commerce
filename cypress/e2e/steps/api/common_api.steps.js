import { Then as Entao } from '@badeball/cypress-cucumber-preprocessor'

Entao('o status da resposta deve ser {int}', (statusCode) => {
  cy.get('@apiResponse').its('status').should('eq', statusCode)
})
