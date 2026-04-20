import { When as Quando, Then as Entao } from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../support/pages/HomePage'
import CarrinhoPage from '../../support/pages/CarrinhoPage'

Quando('eu acesso o meu carrinho sem adicionar produtos', () => {
  cy.emptyCartUi()
})

Entao('o sistema deve informar que o carrinho esta vazio', () => {
  CarrinhoPage.verifyEmptyCart()
})
