import { When as Quando, Then as Entao } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../../support/pages/HomePage'
import CarrinhoPage from '../../../support/pages/CarrinhoPage'
import CheckoutPage from '../../../support/pages/CheckoutPage'

Quando('eu finalizo a compra com cartão de crédito da bandeira {string}', (bandeira) => {
  cy.getCardData(bandeira).then((card) => {
    cy.goToCheckoutAndFillData()
    CheckoutPage.selectCreditCard(card.number, card.expiry, card.cvc)
    cy.finishCheckoutProcess()
  })
})

Quando('eu finalizo a compra com cartão e peço para criar uma nova conta', () => {
  cy.getCardData('Visa').then((card) => {
    cy.goToCheckoutAndFillData()
    CheckoutPage.checkCreateAccount()
    cy.generateStrongPassword().then((strongPassword) => {
      CheckoutPage.fillPassword(strongPassword)
    })
    CheckoutPage.selectCreditCard(card.number, card.expiry, card.cvc)
    cy.finishCheckoutProcess()
  })
})

Quando('eu finalizo a compra pagando via Pix', () => {
  cy.goToCheckoutAndFillData()
  CheckoutPage.selectPix()
  cy.finishCheckoutProcess()
})

Quando('eu finalizo a compra pagando via Boleto', () => {
  cy.goToCheckoutAndFillData()
  CheckoutPage.selectBoleto()
  cy.finishCheckoutProcess()
})

Quando('eu tento finalizar o checkout sem preencher os campos obrigatorios', () => {
  HomePage.goToCart()
  CarrinhoPage.goToCheckout()
  CheckoutPage.finishOrder()
})

Entao('o pedido deve ser concluido com sucesso e exibir o numero do pedido', () => {
  CheckoutPage.verifySuccessMessage()
})

Entao('o pedido deve ser concluido com sucesso via Pix ou Boleto', () => {
  CheckoutPage.verifySuccessPixBoleto()
})

Entao('as mensagens de erro nos campos obrigatórios devem ser exibidas', () => {
  CheckoutPage.verifyValidationErrors()
})
