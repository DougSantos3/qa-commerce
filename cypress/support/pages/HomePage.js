class HomePage {
  visit() {
    cy.visit('/')
  }

  searchProduct(productName) {
    cy.get('#search-input').clear()
    cy.get('#search-input').type(`${productName}{enter}`)
  }

  addToCart(productId) {
    cy.get(`.add-to-cart[data-id="${productId}"]`).click()
  }

  addFirstProductToCart() {
    cy.get('.add-to-cart').first().click()
  }

  setFirstProductQuantity(quantidade) {
    cy.get('input[type="number"]').first().clear()
    cy.get('input[type="number"]').first().type(quantidade)
  }

  goToCart() {
    cy.get('a[href="/cart.html"]').first().click()
  }

  goToLogin() {
    cy.get('#account-link').click()
  }
}

export default new HomePage()
