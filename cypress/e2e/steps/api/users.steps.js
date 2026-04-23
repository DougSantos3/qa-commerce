import {
  Given as Dado,
  When as Quando,
  Then as Entao
} from '@badeball/cypress-cucumber-preprocessor'
import ApiService from '../../../support/services/ApiService'

let payload
let authToken
let currentUserId

Dado('que estou autenticado como administrador', () => {
  cy.fixture('auth').then((auth) => {
    ApiService.login(auth.adminEmail, auth.adminPassword).then((response) => {
      authToken = response.body.token
      currentUserId = response.body.id
    })
  })
})

Dado('que possuo os dados de um usuário para atualização', () => {
  cy.generateUser().then((user) => {
    payload = {
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: false
    }
  })
})

Quando('envio uma requisição PUT para atualizar o usuário {int}', (userId) => {
  const targetId = userId === 1 ? currentUserId : userId
  ApiService.updateUser(targetId, payload, authToken).as('apiResponse')
})

Entao('o corpo da resposta deve conter a mensagem de sucesso da atualização do usuário', () => {
  cy.get('@apiResponse').then((response) => {
    cy.fixture('locales/pt.json').then((loc) => {
      expect(response.body.message).to.eq(loc.api.userUpdateSuccess)
    })
  })
})
