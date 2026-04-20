# language: pt
Funcionalidade: Home - Adicionar Produtos
  Como um cliente da loja
  Quero poder adicionar produtos a partir da tela inicial
  Para preencher meu carrinho de compras

Contexto:
  Dado que acesso a loja virtual

Cenário: Adicionar produto com sucesso
  Quando eu clico para adicionar o primeiro produto ao carrinho
  Então o produto deve aparecer no meu carrinho com a quantidade "1"

Cenário: Fechamento de compra com múltiplas unidades do mesmo produto
  E adiciono "2" unidades do mesmo produto ao carrinho
  Quando eu finalizo a compra com cartão de crédito da bandeira "Visa"
  Então o pedido deve ser concluido com sucesso e exibir o numero do pedido
