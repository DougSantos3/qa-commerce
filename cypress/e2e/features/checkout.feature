# language: pt
Funcionalidade: Checkout
  Como um cliente da loja
  Quero poder realizar o checkout dos meus produtos
  Para concluir minhas compras com sucesso

Contexto:
  Dado que acesso a loja virtual

Esquema do Cenário: Fechamento de compra com cartão de crédito não cadastrando a conta
  E adiciono um produto ao carrinho
  Quando eu finalizo a compra com cartão de crédito da bandeira "<bandeira>"
  Então o pedido deve ser concluido com sucesso e exibir o numero do pedido

  Exemplos:
    | bandeira   |
    | Visa       |
    | Mastercard |
    | Amex       |

Cenário: Fechamento de compra pagando com Pix
  E adiciono um produto ao carrinho
  Quando eu finalizo a compra pagando via Pix
  Então o pedido deve ser concluido com sucesso via Pix ou Boleto

Cenário: Fechamento de compra pagando com Boleto
  E adiciono um produto ao carrinho
  Quando eu finalizo a compra pagando via Boleto
  Então o pedido deve ser concluido com sucesso via Pix ou Boleto

Cenário: Validação de Campos Obrigatórios no Checkout
  E adiciono um produto ao carrinho
  Quando eu tento finalizar o checkout sem preencher os campos obrigatorios
  Então as mensagens de erro nos campos obrigatórios devem ser exibidas

Cenário: Fechamento de compra CRIANDO A CONTA
  E adiciono um produto ao carrinho
  Quando eu finalizo a compra com cartão e peço para criar uma nova conta
  Então o pedido deve ser concluido com sucesso e exibir o numero do pedido
