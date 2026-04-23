class DashboardPage {
  visit() {
    cy.visit('/dashboard.html')
  }

  verifyWelcomeMessage(name) {
    cy.get('#user-name').should('contain', name)
  }

  verifyLastOrder(orderId, total, status) {
    cy.get('#order-id').should('contain', orderId)
    cy.get('#order-total').should('contain', total)
    cy.get('#order-status').should('contain', status)
  }

  goToUpdateAccount() {
    cy.get('#update-account-button').click()
  }

  logout() {
    cy.get('#logout-button').click()
  }
}

export default new DashboardPage()
