import { faker } from '@faker-js/faker'
import HomePage from './pages/HomePage'
import CarrinhoPage from './pages/CarrinhoPage'
import CheckoutPage from './pages/CheckoutPage'
import ApiService from './services/ApiService'

Cypress.Commands.add('emptyCartUi', () => {
  cy.visit('/cart.html')

  cy.get('#cart-list').should(($list) => {
    const hasItems = $list.find('.remove-from-cart').length > 0
    const isEmpty = $list.find('a[href="/"]').length > 0
    expect(hasItems || isEmpty).to.be.true
  })

  const removeNext = () => {
    cy.get('body').then(($body) => {
      const $btns = $body.find('.remove-from-cart')
      if ($btns.length > 0) {
        const countBefore = $btns.length
        cy.intercept('DELETE', '**/api/carrinho/**').as('deleteItem')
        cy.get('.remove-from-cart').first().click()
        cy.wait('@deleteItem')

        if (countBefore === 1) {
          cy.get('.remove-from-cart').should('not.exist')
          cy.get('#totals').should('have.class', 'd-none')
        } else {
          cy.get('.remove-from-cart').should('have.length', countBefore - 1)
        }

        removeNext()
      }
    })
  }
  removeNext()
})

Cypress.Commands.add('getCardData', (bandeira) => {
  const cards = {
    Visa: { number: '4920212106084585', expiry: '1230', cvc: '123' },
    Mastercard: { number: '5345361897107982', expiry: '1230', cvc: '123' },
    Amex: { number: '370889968833903', expiry: '1230', cvc: '123' }
  }
  return cards[bandeira] || cards['Visa']
})

Cypress.Commands.add('goToCheckoutAndFillData', () => {
  const currentUser = Cypress.env('currentUser')
  HomePage.goToCart()
  CarrinhoPage.goToCheckout()
  CheckoutPage.fillPersonalData(currentUser)
})

Cypress.Commands.add('finishCheckoutProcess', () => {
  CheckoutPage.acceptTerms()
  CheckoutPage.finishOrder()
})

Cypress.Commands.add('verifyCartQuantity', (quantidade) => {
  HomePage.goToCart()
  CarrinhoPage.verifyProductQuantity(quantidade)
})

Cypress.Commands.add('generateRandomUserId', () => {
  const id = faker.number.int({ min: 1000, max: 9999 })
  Cypress.env('userId', id)
  return cy.wrap(id)
})

Cypress.Commands.add('generateCheckoutPayload', (overrides = {}) => {
  const payload = {
    userId: faker.number.int({ min: 1000, max: 9999 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    number: '77',
    cep: '09763800',
    phone: '1143398585',
    email: faker.internet.email(),
    paymentMethod: 'credit_card',
    cardNumber: '4920212106084585',
    cardExpiry: '1230',
    cardCvc: '123',
    createAccount: false,
    ...overrides
  }
  cy.log('Checkout Payload:', JSON.stringify(payload))
  return cy.wrap(payload)
})

Cypress.Commands.add('generateStrongPassword', () => {
  return faker.internet.password({
    length: 12,
    memorable: false,
    pattern: /[A-Z]/,
    prefix: 'A!'
  })
})

Cypress.Commands.add('generateUser', () => {
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    name: faker.person.fullName(),
    address: faker.location.streetAddress(),
    number: faker.number.int({ min: 1, max: 999 }).toString(),
    cep: faker.string.numeric(8),
    phone: faker.string.numeric(11),
    email: faker.internet.email(),
    password: faker.internet.password({
      length: 12,
      memorable: false,
      pattern: /[A-Z]/,
      prefix: 'A!'
    })
  }
  Cypress.env('currentUser', user)
  return cy.wrap(user)
})

Cypress.Commands.add('testAdminLogin', () => {
  cy.fixture('auth').then((auth) => {
    ApiService.login(auth.adminEmail, auth.adminPassword).then((response) => {
      if (response.status === 200) {
        cy.log('Login Success:', JSON.stringify(response.body))
      } else {
        cy.log('Login Failed:', JSON.stringify(response.body))
      }
      return response
    })
  })
})
