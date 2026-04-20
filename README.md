# QA Commerce - Automação de Testes (Cypress + Cucumber)

Este projeto contém a automação de testes funcionais (Web) e de API para o sistema QA-Commerce. 

## 🚀 Tecnologias Utilizadas

- **[Cypress](https://docs.cypress.io/)**: Framework principal de automação E2E e API.
- **[Cucumber (BDD)](https://cucumber.io/docs/guides/overview/)**: Para escrita de cenários em linguagem natural (Gherkin) de forma declarativa.
- **Page Objects Pattern**: Padrão de projeto adotado para encapsular a lógica de interação com a UI, maximizando a reutilização e facilitando a manutenção do código.
- **[@faker-js/faker](https://fakerjs.dev/)**: Utilizado para geração de massa de dados dinâmicos (nomes, emails, endereços, etc), garantindo testes autônomos e evitando colisões de dados.
- **[Allure Report](https://allurereport.org/docs/cypress/)**: Utilizado para gerar relatórios detalhados das execuções de testes.

## 📂 Estrutura do Projeto

```text
cypress/
  ├── e2e/
  │   ├── api/                 # Testes de API (Cypress Request)
  │   │   └── checkout.cy.js   # Validações de backend (POST, GET, PUT, DELETE)
  │   ├── features/            # Arquivos Gherkin (.feature) 
  │   │   └── checkout.feature # Cenários Web BDD com escrita declarativa
  │   └── steps/               # Implementação dos Steps do Cucumber
  │       └── checkout.steps.js
  ├── support/
  │   ├── pages/               # Classes do Page Objects Pattern
  │   │   ├── CarrinhoPage.js
  │   │   ├── CheckoutPage.js
  │   │   ├── HomePage.js
  │   │   └── MinhaContaPage.js
  │   └── services/            # Serviços Reutilizáveis (APIs)
  │       └── ApiService.js
```

## ⚙️ Pré-requisitos

Certifique-se de ter os seguintes itens instalados no seu ambiente:
- [Node.js](https://nodejs.org/en/download/) (Recomendado v16+)
- [Git](https://git-scm.com/downloads)

## 🛠️ Instalação e Execução

Siga os passos abaixo para preparar o ambiente e rodar os testes:

**1. Clone o repositório:**
```bash
git clone https://github.com/fabioaraujoqa/qa-commerce.git
cd qa-commerce
```

**2. Instale as dependências:**
```bash
npm install
```

**3. Inicie o sistema alvo:**
Os testes esperam que a aplicação esteja rodando localmente.
```bash
npm start
```
A aplicação estará disponível em `http://localhost:3000`

**4. Execute os Testes:**

Para rodar todos os testes (API e Web) no terminal (modo headless):
```bash
npm run cypress:run
```

Para abrir a interface interativa do Cypress e acompanhar a execução visualmente:
```bash
npm run cypress:open
```


