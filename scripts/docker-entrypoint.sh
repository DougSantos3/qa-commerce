#!/bin/bash
set -e

echo "Inicializando banco de dados..."
npm run db

echo "Iniciando a aplicação..."
npm start &

echo "Aguardando a aplicação estar pronta em http://127.0.0.1:3000..."
npx wait-on http://127.0.0.1:3000

echo "Executando testes do Cypress..."
npm run cy:run:dev

echo "Gerando relatório Allure..."
npm run allure:generate

echo "Processo concluído com sucesso."
