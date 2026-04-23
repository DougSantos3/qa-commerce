class UserPage {
  fillName(name) {
    cy.get('#name').clear()
    cy.get('#name').type(name)
  }

  fillEmail(email) {
    cy.get('#email').clear()
    cy.get('#email').type(email)
  }

  fillPassword(password) {
    cy.get('#password').clear()
    cy.get('#password').type(password)
  }

  submit() {
    cy.get('button[type="submit"]').click()
  }

  verifySuccessMessage() {
    cy.fixture('locales/pt.json').then((loc) => {
      cy.get('#alert-container').should('contain', loc.user.updateSuccess)
    })
  }
}

export default new UserPage()
