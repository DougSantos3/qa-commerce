import {
  Given as Dado,
  When as Quando,
  Then as Entao
} from '@badeball/cypress-cucumber-preprocessor'
import ApiService from '../../../support/services/ApiService'

const userId = () => Cypress.env('userId')

Dado('que possuo um ID de usuário aleatório', () => {
  cy.generateRandomUserId()
})

Dado('que o carrinho do usuário está configurado', () => {
  return ApiService.setupCart(userId())
})

Dado('que o carrinho do usuário possui {int} unidades do produto {int}', (quantity, productId) => {
  return ApiService.setupCart(userId(), productId, quantity)
})

Quando('envio uma requisição POST para finalizar o checkout', () => {
  cy.generateCheckoutPayload({ userId: userId() }).then((payload) => {
    ApiService.checkout(payload).as('apiResponse')
  })
})

Quando('envio uma requisição GET para visualizar o carrinho', () => {
  ApiService.getCart(userId()).as('apiResponse')
})

Quando('envio uma requisição DELETE para limpar o carrinho', () => {
  ApiService.clearCart(userId()).as('apiResponse')
})

Entao('o corpo da resposta deve conter os dados do pedido finalizado', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('id')
    expect(response.body).to.have.property('orderNumber')
  })
})

Entao('a lista de produtos deve conter as informações corretas', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.be.an('array')
    expect(response.body.length).to.be.greaterThan(0)
    expect(response.body[0]).to.have.property('productId', 1)
    expect(response.body[0]).to.have.property('quantity', 2)
  })
})

Entao('ao consultar o carrinho ele deve estar vazio', () => {
  ApiService.getCart(userId()).then((getRes) => {
    expect(getRes.status).to.eq(200)
    expect(getRes.body).to.be.an('array').that.is.empty
  })
})
