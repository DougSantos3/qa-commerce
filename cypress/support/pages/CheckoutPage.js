class CheckoutPage {
  fillPersonalData(user) {
    cy.get('#first-name').clear()
    cy.get('#first-name').type(user.firstName)
    cy.get('#last-name').clear()
    cy.get('#last-name').type(user.lastName)
    cy.get('#address').clear()
    cy.get('#address').type(user.address)
    cy.get('#number').clear()
    cy.get('#number').type(user.number)
    cy.get('#cep').clear()
    cy.get('#cep').type(user.cep)
    if (user.phone) {
      cy.get('#phone').clear()
      cy.get('#phone').type(user.phone)
    }
    cy.get('#email').clear()
    cy.get('#email').type(user.email)
  }

  fillPassword(password) {
    cy.get('#password').clear()
    cy.get('#password').type(password)
    cy.get('#confirm-password').clear()
    cy.get('#confirm-password').type(password)
  }

  checkCreateAccount() {
    cy.get('#create-account').check()
  }

  selectCreditCard(cardNumber, validity, cvc) {
    cy.get('#payment-card').check()
    cy.get('#card-number').clear()
    cy.get('#card-number').type(cardNumber)
    cy.get('#card-expiry').clear()
    cy.get('#card-expiry').type(validity)
    cy.get('#card-cvc').clear()
    cy.get('#card-cvc').type(cvc)
  }

  selectPix() {
    cy.get('#payment-pix').check()
    cy.get('#pix-details').should('be.visible')
  }

  selectBoleto() {
    cy.get('#payment-boleto').check()
    cy.get('#boleto-details').should('be.visible')
  }

  acceptTerms() {
    cy.get('#terms').check()
  }

  finishOrder() {
    cy.get('button[type="submit"]').click()
  }

  verifySuccessMessage() {
    cy.get('#order-status', { timeout: 10000 }).should('be.visible')
    cy.fixture('locales/pt.json').then((loc) => {
      cy.get('#order-status').should('contain', loc.checkout.success)
    })
  }

  verifySuccessPixBoleto() {
    this.verifySuccessMessage()
    cy.fixture('locales/pt.json').then((loc) => {
      cy.get('#order-status').should('contain', loc.checkout.orderIdLabel)
    })
  }

  verifyValidationErrors() {
    cy.get('#alert-container').should('be.visible')
  }
}

export default new CheckoutPage()
