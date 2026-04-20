Cypress.Commands.add('emptyCartUi', () => {
  cy.visit('/')
  cy.contains('CARRINHO').click()

  const removeNext = () => {
    cy.get('body').then(($body) => {
      if ($body.find('.remove-from-cart').length > 0) {
        cy.get('.remove-from-cart').first().click()
        cy.wait(500)
        removeNext()
      }
    })
  }
  removeNext()
})
