import { faker } from '@faker-js/faker'

class ApiService {
  constructor() {
    this.apiUrl = Cypress.config('baseUrl') + '/api'
  }

  generateCheckoutPayload(overrides = {}) {
    return {
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
  }

  setupCart(userId, productId = 1, quantity = 1) {
    return cy.request({
      method: 'POST',
      url: `${this.apiUrl}/carrinho`,
      body: { userId, productId, quantity },
      failOnStatusCode: false
    })
  }

  checkout(payload) {
    return cy.request({
      method: 'POST',
      url: `${this.apiUrl}/checkout`,
      body: payload,
      failOnStatusCode: false
    })
  }

  clearCart(userId) {
    return cy.request('DELETE', `${this.apiUrl}/carrinho/${userId}`)
  }

  getCart(userId) {
    return cy.request('GET', `${this.apiUrl}/carrinho/${userId}`)
  }

}

export default new ApiService()
