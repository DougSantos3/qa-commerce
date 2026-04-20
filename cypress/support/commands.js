Cypress.Commands.add('emptyCartUi', () => {
  cy.visit('/cart.html')
  
  cy.get('#cart-list').should(($list) => {
    expect($list.text()).to.match(/Seu carrinho está vazio|Remover/)
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
          cy.contains('Seu carrinho está vazio.').should('be.visible')
        } else {
          cy.get('.remove-from-cart').should('have.length', countBefore - 1)
        }
        
        removeNext()
      }
    })
  }
  removeNext()
})
