import { When as Quando, Then as Entao } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../support/pages/HomePage'
import CarrinhoPage from '../../support/pages/CarrinhoPage'
import CheckoutPage from '../../support/pages/CheckoutPage'

const getCardData = (bandeira) => {
  const cards = {
    'Visa': { number: '4920212106084585', expiry: '1230', cvc: '123' },
    'Mastercard': { number: '5345361897107982', expiry: '1230', cvc: '123' },
    'Amex': { number: '370889968833903', expiry: '1230', cvc: '123' }
  }
  return cards[bandeira] || cards['Visa']
}

const goToCheckoutAndFillData = () => {
  const currentUser = Cypress.env('currentUser')
  HomePage.goToCart()
  CarrinhoPage.goToCheckout()
  CheckoutPage.fillPersonalData(currentUser)
}

const finishCheckoutProcess = () => {
  CheckoutPage.acceptTerms()
  CheckoutPage.finishOrder()
}

Quando('eu finalizo a compra com cartão de crédito da bandeira {string}', (bandeira) => {
  const card = getCardData(bandeira)
  goToCheckoutAndFillData()
  CheckoutPage.selectCreditCard(card.number, card.expiry, card.cvc)
  finishCheckoutProcess()
})

Quando('eu finalizo a compra com cartão e peço para criar uma nova conta', () => {
  const card = getCardData('Visa')
  goToCheckoutAndFillData()
  CheckoutPage.checkCreateAccount()
  CheckoutPage.fillPassword('SenhaForte#123')
  CheckoutPage.selectCreditCard(card.number, card.expiry, card.cvc)
  finishCheckoutProcess()
})

Quando('eu finalizo a compra pagando via Pix', () => {
  goToCheckoutAndFillData()
  CheckoutPage.selectPix()
  finishCheckoutProcess()
})

Quando('eu finalizo a compra pagando via Boleto', () => {
  goToCheckoutAndFillData()
  CheckoutPage.selectBoleto()
  finishCheckoutProcess()
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
