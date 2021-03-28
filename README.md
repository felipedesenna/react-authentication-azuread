<h3 align="center">
  Autenticação Azure AD - (ReactJS, Azure AD)
</h3>

# Índice

- [Índice](#índice)
  - [:memo: Sobre](#memo-sobre)
  - [:computer: Como usar](#computer-como-usar)

<a id="sobre"></a>

## :memo: Sobre

O propósito do projeto é criar um template para demonstrar o funcionamento e integração com o Azure AD (Active Directory) no ReactJS.

<a id="como-usar"></a>

## :computer: Como usar

1 - Faça o download ou clone do projeto:

```sh
  $ git clone https://github.com/felipedesenna/react-authentication-azuread.git
```

2 - Executando o projeto:
Os comandos devem ser executados na raiz do projeto utilizando um terminal (CMD ou Bash)

```sh
  # Instale as dependências do projeto
  $ npm install / yarn

  # Comando para rodar o projeto local
  $ npm start / yarn start

  ## Build da aplicação
  $ npm run build / yarn build
```

Os comandos acima vão criar o build do projeto, esse build é necessário para colocar o projeto em produção.

- ### env File
No projeto existe um arquivo .env.example que é o arquivo de exemplo para criar o arquivo .env que é necessário para configurar as informações do aplicativo criado no Azure AD e que faz a validação das informações comunicando o projeto com o Azure.

```sh
  REACT_APP_CLIENT_ID=ID_do_aplicativo
  REACT_APP_REDIRECT_URI=URIs_de_Redirecionamento
```
Para isso faça uma cópia do arquivo .env.example e renomeie para .env e substitua as informações que são disponibilizadas no **registro de aplicativo** dentro do Azure.

- ### **Observação**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/download/)** instalado na máquina e para gerenciar os pacotes da aplicação o **[NPM](https://www.npmjs.com/get-npm)** ou **[Yarn](https://yarnpkg.com/getting-started/install)**.