import { faker } from '@faker-js/faker'
import ApiService from '../../support/services/ApiService'

describe('CRUD Scenarios', () => {
  let userId;

  beforeEach(() => {
    userId = faker.number.int({ min: 1000, max: 9999 })
  })

  it('POST - Fechamento de compra', () => {
    const payload = ApiService.generateCheckoutPayload({ userId })
    ApiService.setupCart(userId)

    ApiService.checkout(payload).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('id')
      expect(response.body).to.have.property('orderNumber')
    })
  })

  it('GET - Visualizar carrinho de compras', () => {
    ApiService.setupCart(userId, 1, 2)
    
    ApiService.getCart(userId).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.greaterThan(0)
      expect(response.body[0]).to.have.property('productId', 1)
      expect(response.body[0]).to.have.property('quantity', 2)
    })
  })

  it('DELETE - Limpar carrinho de compras', () => {
    ApiService.setupCart(userId)
    
    ApiService.clearCart(userId).then((response) => {
      expect(response.status).to.eq(200)
      
      ApiService.getCart(userId).then((getRes) => {
        expect(getRes.status).to.eq(200)
        expect(getRes.body).to.be.an('array').that.is.empty
      })
    })
  })

})
