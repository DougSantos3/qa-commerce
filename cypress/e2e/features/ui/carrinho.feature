# language: pt
Funcionalidade: Carrinho de Compras
Como um cliente da loja
Quero poder acessar meu carrinho
Para visualizar os produtos que adicionei ou gerenciar um carrinho vazio

Contexto:
Dado que acesso a loja virtual

Cenário: Analisar carrinho vazio
Quando eu acesso o meu carrinho sem adicionar produtos
Então o sistema deve informar que o carrinho esta vazio
