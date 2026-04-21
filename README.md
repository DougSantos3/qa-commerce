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

## 📊 Relatórios de Teste (Allure Report 2)

O projeto está configurado com o **Allure Report 2** totalmente integrado ao pipeline de CI/CD! 
A cada execução, um relatório dinâmico e interativo é gerado com gráficos, histórico de tendências (trends) e evidências.

👉 **Você pode clicar, acessar e ver o relatório completo aqui:**  
[https://dougsantos3.github.io/qa-commerce/](https://dougsantos3.github.io/qa-commerce/)

## ☁️ Execução na Nuvem (GitHub Actions)

A automação está configurada para rodar nativamente no **GitHub Actions** (`.github/workflows/cypress.yml`). Você não precisa instalar nada na sua máquina para rodar!

Através da interface do GitHub (aba *Actions* -> *Cypress E2E Tests* -> *Run workflow*), você tem a opção de escolher em qual navegador os testes serão executados, garantindo a compatibilidade (Cross-Browser Testing). 

Os navegadores disponíveis para escolha são:
- **Chrome**
- **Edge**
- **Safari (WebKit)**
- **Electron** (Padrão)

### 🌍 Execução Multi-Ambientes (Aviso)

O framework foi arquitetado para suportar múltiplos ambientes (Dev, QA, Prod) sem a necessidade de alterar código, apenas trocando a URL base (BaseUrl).
Ao disparar os testes (seja no GitHub Actions ou via linha de comando), você pode selecionar o ambiente alvo.

> ⚠️ **Importante:** Atualmente, para que os testes passem, **você deve rodar no ambiente `dev`**. O motivo é que a aplicação simulada roda localmente durante a execução. Os ambientes `qa` e `prod` estão cadastrados com URLs fictícias (`qa.example.com` etc) no `package.json`. No futuro, basta alterar essas URLs para os endereços reais e a automação testará qualquer ambiente automaticamente!

Para executar todos os testes (API e Web) no terminal (modo headless):
```bash
npm run cypress:run
```

Para abrir a interface interativa do Cypress e acompanhar a execução visualmente:
```bash
npm run cypress:open
```


