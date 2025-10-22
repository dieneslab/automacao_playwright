# 🎭 Playwright Test Automation Project

Bem-vindo ao repositório do meu projeto de automação de testes utilizando [Playwright](https://playwright.dev/)! 🚀

## 📌 Sobre o Projeto

Este projeto foi criado para explorar e demonstrar boas práticas de automação de testes **end-to-end (E2E)** com **Playwright**.
Os testes abrangem cenários de UI e API, com foco em desempenho, paralelismo e execução multiplataforma.

## 🛠️ Tecnologias Utilizadas

-   [Playwright](https://playwright.dev/) - Framework principal de testes
-   [TypeScript](https://www.typescriptlang.org/) - Linguagem utilizada
-   [Node.js](https://nodejs.org/) - Ambiente de execução
-   [GitHub Actions](https://github.com/features/actions) - CI/CD para execução automática dos testes
-   [Allure Report](https://docs.qameta.io/allure/) *(opcional)* - Relatórios detalhados de execução

## 📂 Estrutura do Projeto

``` sh
📦 automacao_playwright
├── 📂 allure-results       # Relatórios gerados Allure
├── 📂 playwright-report    # Relatórios gerados após execução
├── 📂 test-results         # Resultados de execução dos testes
├── 📂 tests                # Diretório principal dos testes
│   ├── 📜 login.spec.ts    # Exemplo de teste de login
├── 📜 package.json         # Dependências e scripts de execução
├── 📜 playwright.config.ts # Configuração do Playwright
└── 📜 README.md            # Documentação do projeto
└── 📜 tsconfig.json        # Configuração TypeScript
```

## 🚀 Como Executar os Testes

### 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

-   [Node.js](https://nodejs.org/en/)
-   [Git](https://git-scm.com/)

### 📥 Clonar o Repositório

``` sh
git clone https://github.com/dieneslab/automacao_playwright.git
cd automacao_playwright
```

### 📦 Instalar Dependências

``` sh
npm install
npm i -D typescript
npm init playwright@latest
```

### ▶️ Executar Testes

``` sh
npm run test
```

## 🧾 Relatórios

O Playwright gera relatórios automáticos após cada execução.
Para visualizar:

``` sh
npx playwright show-report
```

Os relatórios são salvos por padrão em `playwright-report/`.

Também há possibilidade de gerar relatórios com Allure Report.
Para visualizar:

``` sh
npx allure serve allure-results
```

O relatório inclui gráficos, métricas e histórico de execuções.  
Ele pode ser consultado pelo [**LINK**](https://dieneslab.github.io/automacao_playwright/).

---

## ⚡ Execução Automática via GitHub Actions

A cada **push** ou **pull request**, os testes são executados
automaticamente no GitHub Actions.\
Para visualizar os resultados:

1.  Vá até a aba **Actions** do repositório.
2.  Selecione o workflow mais recente.
3.  Consulte logs e baixe relatórios (se configurados como artifacts).

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar PRs.
Toda contribuição é bem-vinda! 💡

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo
[LICENSE](LICENSE) para mais detalhes.

------------------------------------------------------------------------

Desenvolvido por [Dienes Stein](https://github.com/dieneslab) 💻✨
