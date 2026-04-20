class HomePage {
  visit() {
    cy.visit('/')
  }

  addFirstProductToCart() {
    cy.contains('button', 'Adicionar ao Carrinho').first().click()
  }


  setFirstProductQuantity(quantity) {
    cy.get('#quantity-1').clear().type(quantity)
  }

  goToCart() {
    cy.contains('CARRINHO').click()
  }

}

export default new HomePage()
