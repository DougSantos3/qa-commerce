class CheckoutPage {
  _fillInput(label, value) {
    cy.contains('label', label).parent().find('input').clear().type(value)
  }

  fillPersonalData(user) {
    this._fillInput('Nome *', user.firstName)
    this._fillInput('Sobrenome *', user.lastName)
    this._fillInput('Endereço *', user.address)
    this._fillInput('Número *', user.number)
    this._fillInput('CEP *', user.cep)
    this._fillInput('Telefone', user.phone)
    this._fillInput('Email *', user.email)
  }

  fillPassword(password) {
    this._fillInput('Senha *', password)
    this._fillInput('Confirmar Senha *', password)
  }

  checkCreateAccount() {
    cy.contains('Deseja criar uma conta com').click()
  }

  selectCreditCard(cardNumber, validity, cvc) {
    cy.contains('Cartão de Crédito').click()
    this._fillInput('Número do Cartão *', cardNumber)
    this._fillInput('Validade *', validity)
    this._fillInput('CVC *', cvc)
  }

  selectPix() {
    cy.contains('Pix').click()
    cy.contains('Detalhes do Pix').should('be.visible')
  }

  selectBoleto() {
    cy.contains('Boleto').click()
    cy.contains('Código de Boleto:').should('be.visible')
  }

  acceptTerms() {
    cy.get('#terms').check({ force: true })
  }

  finishOrder() {
    cy.contains('button', 'Finalizar Pedido').click()
  }

  verifySuccessMessage() {
    cy.contains('Obrigado pelo seu pedido').should('be.visible')
    cy.contains('Pagamento aprovado').should('be.visible')
  }

  verifySuccessPixBoleto() {
    this.verifySuccessMessage()
    cy.contains('ID do Pedido:').should('be.visible')
  }

  verifyValidationErrors() {
    const errors = [
      'Li e concordo com os Termos e Condições deste site. * Este campo é obrigatório.',
      'Nome * Este campo é obrigatório.',
      'Sobrenome * Este campo é',
      'Endereço * Este campo é',
      'Número * Este campo é obrigat',
      'CEP * Este campo é obrigató',
      'Email * Este campo é obrigató',
      'Por favor, preencha todos os'
    ]
    errors.forEach(msg => cy.contains(msg).should('be.visible'))
  }
}

export default new CheckoutPage()
