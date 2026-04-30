import { Given as Dado } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../../support/pages/HomePage'

Dado('que acesso a loja virtual', () => {
  cy.emptyCartUi()
  HomePage.visit()
  cy.generateUser()
})
