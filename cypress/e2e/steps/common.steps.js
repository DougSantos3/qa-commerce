import { Given as Dado } from '@badeball/cypress-cucumber-preprocessor'
import { faker } from '@faker-js/faker'
import HomePage from '../../support/pages/HomePage'

Dado('que acesso a loja virtual', () => {
  cy.emptyCartUi()
  HomePage.visit()
  Cypress.env('currentUser', {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    number: '77',
    cep: '09763800',
    phone: '1143398585',
    email: faker.internet.email()
  })
})
