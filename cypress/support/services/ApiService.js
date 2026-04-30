class ApiService {
  constructor() {
    this.apiUrl = Cypress.config('baseUrl') + '/api'
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

  updateUser(userId, payload, token) {
    return cy.request({
      method: 'PUT',
      url: `${this.apiUrl}/users/${userId}`,
      body: payload,
      headers: {
        Authorization: token
      },
      failOnStatusCode: false
    })
  }

  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.apiUrl}/login`,
      body: { email, password }
    })
  }
}

export default new ApiService()
