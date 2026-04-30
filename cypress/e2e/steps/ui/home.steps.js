import {
  Given as Dado,
  When as Quando,
  Then as Entao
} from '@badeball/cypress-cucumber-preprocessor'
import HomePage from '../../../support/pages/HomePage'

Dado('adiciono um produto ao carrinho', () => {
  HomePage.addFirstProductToCart()
})

Dado('adiciono {string} unidades do mesmo produto ao carrinho', (quantidade) => {
  HomePage.setFirstProductQuantity(quantidade)
  HomePage.addFirstProductToCart()
  cy.verifyCartQuantity(quantidade)
})

Quando('eu clico para adicionar o primeiro produto ao carrinho', () => {
  HomePage.addFirstProductToCart()
})

Entao('o produto deve aparecer no meu carrinho com a quantidade {string}', (quantidade) => {
  cy.verifyCartQuantity(quantidade)
})
