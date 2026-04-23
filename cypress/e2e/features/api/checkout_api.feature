# language: pt

Funcionalidade: API - Checkout e Carrinho

  Contexto:
    Dado que possuo um ID de usuário aleatório

  Cenario: Fechamento de compra com sucesso (POST)
    Dado que o carrinho do usuário está configurado
    Quando envio uma requisição POST para finalizar o checkout
    Entao o status da resposta deve ser 201
    E o corpo da resposta deve conter os dados do pedido finalizado

  Cenario: Visualizar carrinho de compras (GET)
    Dado que o carrinho do usuário possui 2 unidades do produto 1
    Quando envio uma requisição GET para visualizar o carrinho
    Entao o status da resposta deve ser 200
    E a lista de produtos deve conter as informações corretas

  Cenario: Limpar carrinho de compras (DELETE)
    Dado que o carrinho do usuário está configurado
    Quando envio uma requisição DELETE para limpar o carrinho
    Entao o status da resposta deve ser 200
    E ao consultar o carrinho ele deve estar vazio
