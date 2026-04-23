# language: pt

Funcionalidade: API - Gestão de Usuários

  Cenario: Atualizar os dados de um usuário com sucesso (PUT)
    Dado que estou autenticado como administrador
    E que possuo os dados de um usuário para atualização
    Quando envio uma requisição PUT para atualizar o usuário 1
    Entao o status da resposta deve ser 200
    E o corpo da resposta deve conter a mensagem de sucesso da atualização do usuário
