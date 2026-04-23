# 🛒 QA Commerce - Automação de Testes

An enterprise-grade End-to-End & API testing suite built with **Cypress** and **Cucumber**.
Designed to demonstrate advanced QA automation strategies, including Page Object Model, dynamic data generation, and BDD.

  <br>
  
  <p>
    <img src="https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Cucumber_BDD-23D160?style=for-the-badge&logo=cucumber&logoColor=white" alt="Cucumber" />
    <img src="https://img.shields.io/badge/Allure_Report-FF3B00?style=for-the-badge&logo=alluredotcom&logoColor=white" alt="Allure" />
  </p>

  <p>
    <a href="https://github.com/DougSantos3/qa-commerce/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/DougSantos3/qa-commerce/cypress.yml?style=for-the-badge&logo=github" alt="GitHub Actions Pipeline Status" />
    </a>
    <a href="https://sonarcloud.io/summary/new_code?id=DougSantos3_qa-commerce">
      <img src="https://img.shields.io/sonar/quality_gate/DougSantos3_qa-commerce?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge&logo=sonarcloud&logoColor=white" alt="Quality Gate Status" />
      <img src="https://img.shields.io/sonar/bugs/DougSantos3_qa-commerce?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge&logo=sonarcloud&logoColor=white" alt="Bugs" />
      <img src="https://img.shields.io/sonar/violations/DougSantos3_qa-commerce?server=https%3A%2F%2Fsonarcloud.io&style=for-the-badge&logo=sonarcloud&logoColor=white&label=Code%20Smells" alt="Code Smells" />
    </a>
  </p>
</div>

---

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
  │   │   └── checkout.cy.js   # Validações de backend (POST, GET, DELETE)
  │   ├── features/            # Arquivos Gherkin (.feature)
  │   │   ├── checkout.feature # Cenários Web BDD com escrita declarativa
  │   │   └── ...              # Outras features (home, carrinho, etc)
  │   └── steps/               # Implementação dos Steps do Cucumber
  │       ├── checkout.steps.js
  │       └── ...              # Outros arquivos de steps
  ├── support/
  │   ├── e2e.js               # Configurações globais (Allure, Hooks)
  │   ├── commands.js          # Comandos customizados do Cypress
  │   ├── pages/               # Classes do Page Objects Pattern
  │   │   ├── CheckoutPage.js
  │   │   ├── HomePage.js
  │   │   └── ...              # Outras páginas
  │   └── services/            # Serviços Reutilizáveis (APIs)
  │       └── ApiService.js
```

## 📝 Cobertura de Testes (Cenários)

A suite de testes está dividida em duas grandes áreas, garantindo a qualidade tanto na interface do usuário quanto nas regras de negócio do servidor.

### 💻 Testes de Interface (UI - Web)
**Home & Produtos**
- Adicionar produto com sucesso ao carrinho.
- Alterar quantidade de produtos antes de adicionar.

**Carrinho de Compras**
- Validação de carrinho vazio e navegação de retorno.
- Remoção de itens do carrinho.

**Checkout & Pagamento**
- Fluxo completo de compra com Cartão de Crédito (Visa, Mastercard, Amex).
- Fluxo de compra via Pix (Validação de QR Code/ID).
- Fluxo de compra via Boleto Bancário.
- Validação de campos obrigatórios e mensagens de erro.
- Criação de nova conta durante o processo de fechamento de pedido.

### ⚙️ Testes de Backend (API)
**Carrinho & Checkout**
- `POST /api/checkout`: Validação de fechamento de pedido via API.
- `GET /api/carrinho/{userId}`: Consulta de itens no carrinho.
- `DELETE /api/carrinho/{userId}`: Limpeza total do carrinho do usuário.

**Gestão de Usuários**
- `PUT /api/users/{id}`: Atualização de dados cadastrais com validação de Token JWT.

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
[https://dougsantos3.github.io/qa-commerce/26/index.html#](https://dougsantos3.github.io/qa-commerce/26/index.html#)

## ☁️ Execução na Nuvem (GitHub Actions)

A automação está configurada para rodar nativamente no **GitHub Actions** (`.github/workflows/cypress.yml`). Você não precisa instalar nada na sua máquina para rodar!

Ao acessar a aba _Actions_ no GitHub, você notará a existência de dois workflows (Jobs) principais trabalhando em conjunto:

1. **`Cypress E2E Tests`**: Este é o job que executa os testes de fato. Clicando nele, você acompanha os logs do Cypress em tempo real.
2. **`pages build and deployment`**: Este job é acionado automaticamente logo após o fim dos testes. Ele é o responsável por publicar o relatório do Allure na internet. Para ver o relatório mais recente gerado, clique neste job, depois em `deploy` quando ele ficar verde(sucesso), aparecerá um link clicável direto para o seu painel do Allure!

Através da interface (aba _Actions_ -> _Cypress E2E Tests_ -> _Run workflow_), você tem a opção de escolher em qual navegador os testes serão executados, garantindo a compatibilidade (Cross-Browser Testing).

Os navegadores disponíveis para escolha são:

- **Chrome**
- **Edge**
- **Safari (WebKit)**
- **Electron** (Padrão)
|
> 💡 **Nota sobre Cross-Browser:** Independentemente do navegador selecionado (Chrome, Edge, Safari ou Electron), a suite completa de testes (Web/UI + API) será executada integralmente em todos eles.

### 🌍 Execução Multi-Ambientes (Aviso)

O framework foi arquitetado para suportar múltiplos ambientes (Dev, QA, Prod) sem a necessidade de alterar código, apenas trocando a URL base (BaseUrl).
Ao disparar os testes (seja no GitHub Actions ou via linha de comando), você pode selecionar o ambiente alvo.

> ⚠️ **Importante:** Atualmente, para que os testes passem na nuvem, **você deve rodar no ambiente `dev`**. O motivo é que a aplicação simulada roda localmente no servidor do GitHub Actions. Os ambientes `qa` e `prod` estão com URLs fictícias (`qa.example.com`).
> 💡 **Quer testar o Multi-Ambiente ou rodar o Pipeline você mesmo?**
>
> - **Para rodar no GitHub Actions:** Como você não tem permissão de disparar pipelines neste repositório, você deve fazer um **Fork** deste projeto para a sua conta. No seu Fork, a aba _Actions_ estará liberada para você! Você também poderá alterar as URLs de `qa` e `prod` no arquivo `package.json` para testar os seus próprios servidores.
>
>   > 🔐 **Configuração de Secrets:** No seu Fork, para que os testes de autenticação e nuvem funcionem, você deve criar os seguintes Secrets em `Settings > Secrets and variables > Actions`. **Atenção:** Você deve usar as suas próprias chaves obtidas no painel do BrowserStack:
>   > - **`CYPRESS_AUTH`**: (JSON)
>   >   ```json
>   >   { "adminEmail": "email@example.com", "adminPassword": "password" }
>   >   ```
>   > - **`BROWSERSTACK_USERNAME`**: O seu nome de usuário (Username) do BrowserStack.
>   > - **`BROWSERSTACK_ACCESS_KEY`**: A sua chave de acesso (Access Key) do BrowserStack.
>
> - **Para rodar Localmente:** Basta fazer o **Clone** do projeto (ou do seu Fork) para a sua máquina. Para habilitar o BrowserStack localmente, use o arquivo `.env` na raiz do projeto e preencha com **as suas credenciais pessoais** (veja a seção de [Credenciais do BrowserStack](#-configuração-das-credenciais) abaixo).

### 💻 Execução Local (Comandos Cypress)

Se você clonou o projeto e deseja rodar os testes na sua própria máquina (lembre-se de subir a aplicação alvo com `npm start` se for testar o ambiente `dev`), utilize os comandos abaixo:

**Executar TODOS os testes (Web + API) em background:**

```bash
npm run cypress:run
```

**Executar APENAS os testes de API:**

```bash
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"
```

**Executar APENAS os testes de Web/Front-end:**

```bash
npx cypress run --spec "cypress/e2e/features/**/*.feature"
```

**Abrir a interface visual interativa do Cypress:**

```bash
npm run cypress:open
```

### 🐳 Execução via Docker (Container)

Este projeto está 100% "Dockerizado"! Você pode rodar a aplicação e todos os testes em um ambiente isolado, sem precisar ter Node.js ou navegadores instalados no seu computador.

**1. Construir a imagem Docker:**

```bash
docker build -t qa-commerce-tests .
```

**2. Executar o container:**

```bash
docker run --rm qa-commerce-tests
```

O container vai iniciar o servidor da loja, aguardar a conexão ser estabelecida, e então disparar todos os testes E2E do Cypress automaticamente!

## ☁️ Execução em Nuvem (BrowserStack)

Este projeto está integrado ao **BrowserStack**, permitindo rodar seus testes em uma infraestrutura real com diversos navegadores e sistemas operacionais (Windows, macOS, etc).

A configuração utiliza o **Local Testing**, ou seja, o BrowserStack cria um túnel seguro para acessar o servidor que está rodando na sua máquina local (`http://localhost:3000`).

### ⚙️ Configuração das Credenciais

Para rodar localmente, você deve criar um arquivo `.env` na raiz do projeto (este arquivo é ignorado pelo Git por segurança) com suas chaves:

```env
BROWSERSTACK_USERNAME=seu_usuario
BROWSERSTACK_ACCESS_KEY=sua_chave
```

### 🚀 Como Executar

O comando abaixo inicia o servidor local automaticamente, estabelece a conexão com o BrowserStack e dispara os testes:

```bash
npm run test:browserstack
```

Ao executar este comando (ou acionar o workflow via GitHub Actions), a suite será testada simultaneamente nos seguintes ambientes:

*   **Chrome** (Latest & Latest-1) no **Windows 10**
*   **Firefox** no **Windows 11**
*   **Edge** no **Windows 10**
*   **Safari** no **macOS Ventura**

Acesse o arquivo na raiz browserstack.json e veja com mais detalhes!

> ⚠️ **Atenção (Plano Free):** Se você estiver utilizando uma conta gratuita do BrowserStack, o serviço possui limites rigorosos de tempo e instâncias paralelas. Se o limite for atingido durante a execução, o BrowserStack encerrará as sessões e o comando retornará um erro de falha.

Você pode acompanhar a execução em tempo real no seu dashboard do BrowserStack. 
