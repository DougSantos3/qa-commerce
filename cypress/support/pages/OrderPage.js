class OrderPage {
  verifyOrderDetails(orderId, total, status) {
    cy.fixture('locales/pt.json').then((loc) => {
      cy.get('#order-status').within(() => {
        cy.contains(loc.checkout.orderIdLabel).find('strong').should('contain', orderId)
        cy.contains(loc.checkout.totalLabel).find('strong').should('contain', total)
        cy.contains(loc.checkout.statusLabel).find('strong').should('contain', status)
      })
    })
  }

  verifyThankYouMessage(name) {
    cy.fixture('locales/pt.json').then((loc) => {
      cy.get('#order-status').should('contain', `${loc.checkout.success} ${name}`)
    })
  }
}

export default new OrderPage()
