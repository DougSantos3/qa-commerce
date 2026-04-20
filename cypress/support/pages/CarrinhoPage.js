class CarrinhoPage {
  goToCheckout() {
    cy.contains('Ir para o Checkout').click()
  }

  verifyProductQuantity(expectedQuantity) {
    cy.get('#cart-list').should('contain.text', `Quantidade: ${expectedQuantity}`)
  }



  verifyEmptyCart() {
    cy.contains('Seu carrinho está vazio.').should('be.visible')
    cy.contains('Voltar para Home').should('be.visible')
  }
}

export default new CarrinhoPage()
