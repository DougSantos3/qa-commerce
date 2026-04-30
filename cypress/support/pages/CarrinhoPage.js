class CarrinhoPage {
  goToCheckout() {
    cy.get('a[href="/checkout.html"]').click()
  }

  verifyProductQuantity(expectedQuantity) {
    cy.fixture('locales/pt.json').then((loc) => {
      cy.get('#cart-list').should('contain.text', `${loc.cart.quantityLabel} ${expectedQuantity}`)
    })
  }

  verifyEmptyCart() {
    cy.get('.cart-item').should('not.exist')
    cy.get('#totals').should('have.class', 'd-none')

    cy.fixture('locales/pt.json').then((loc) => {
      cy.contains(loc.cart.empty).should('be.visible')
    })
    cy.get('a[href="/"]').should('be.visible')
  }

  removeProduct(productId) {
    cy.get(`button[data-product-id="${productId}"]`).click()
  }
}

export default new CarrinhoPage()
