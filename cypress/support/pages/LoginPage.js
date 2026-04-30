class LoginPage {
  visit() {
    cy.visit('/login.html')
  }

  login(email, password) {
    cy.get('#email').clear()
    cy.get('#email').type(email)
    cy.get('#password').clear()
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
  }

  goToRegister() {
    cy.get('a[href="/register.html"]').click()
  }
}

export default new LoginPage()
