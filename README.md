<h1 align="center">
    <a href="https://github.com/augustojs1/leet-banking-api">🏦  Leet Banking REST API</a>
    
</h1>
<p align="center">💸 Gerencie seus gastos, renda, saldo, transações e recupere seu controle financeiro em tempo real.</p>

<!--ts-->

- [Tabela de Conteudo](#tabela-de-conteudo)
- [Features](#features)
- [Funcionamento e solução](#funcionamento)
- [Como usar](#como-usar)
  - [Pré Requisitos](#pre-requisitos)
  - [Rodando o Leet Banking API](#pre-requisitos)
- [Tecnologias](#tecnologias)
- [Avaliação](#avaliacao)
- [Próximas Features](#tecnologias)
- [Autor](#autor)
<!--te-->

<h4 align="center"> 
	🚧  Leet Banking API 💸 Em aprimoramento...  🚧
</h4>

### Features

- [x] Cadastro de usuário
- [x] Login de usuário
- [x] Cadastro de transações do tipo renda
- [x] Cadastro de transações do tipo gastos
- [x] Visualização de saldo em tempo real
- [x] Documentação com Swagger

### Funcionamento e solução

A aplicação funciona como uma REST API padrão. Seguindo os requisitos do projeto, resolvi separar em dois diferentes módulos: Autenticação e Transações. O primeiro trata de cadastrar, autenticar e remover a autenticação do usuário da aplicação enquanto o segundo trabalha com as transações do tipo gasto ou renda e saldo do usuário. Cada transação feita já altera o saldo do usuário e não o permite fazer uma transação de gasto caso o valor seja maior que seu saldo atual.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Para visualizar e editar o código pode também utilizar um editor de código [VSCode](https://code.visualstudio.com/).

### 🔥 Rodando o Leet Banking API

```bash
# Clone este repositório
$ git clone https://github.com/augustojs1/leet-banking-api

# Acesse a pasta do projeto utilizando a linha de comando
$ cd leet-banking-api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>

# Documentação das rotas no Swagger acesse no browser
http://localhost:3333/api

```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
  - Por ser meu foco de estudos atual.
- [Nest.js](https://nestjs.com/)
  - Pela arquitetura e ferramentas out-of-the-box, o que me poupa tempo para cumprir o desafio e não precisar configurar todo um projeto utilizando apenas Express.js do zero.
- [MongoDB](https://www.mongodb.com/)
  - Por poder utilizar o serviço MongoDB Atlas em cloud e não precisar configurar e subir um banco SQL do zero. O que também me poupa tempo para cumprir o desafio.
- [Mongoose](https://mongoosejs.com/)
  - Principal ORM para trabalhar com o banco MongoDB.
- [Passport](https://www.passportjs.org/)
  - Por simplificar todo o processo de autenticação e integração com bibliotecas JWT nativas do Nest.js o que me poupa tempo para cumprir o desafio.
- [Git Commit Message Linter](https://github.com/legend80s/commit-msg-linter)
  - Para padronizar e forçar boas práticas de commit.
- [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
  - Para fácil e rápida integração com o Nest.js para documentar a API o que novamente me poupa tempo para cumprir o desafio.

### Avaliação

Os pontos positivos que gostaria de ser avaliado é o cumprimento de todos os requisitos funcionais e regras de negócio da aplicação, a modularidade e arquitetura, minha atenção em documentar tanto a API com Swagger quanto o projeto, a entrega do projeto no prazo determinado mesmo ele sendo menor (4 dias) do que o explicito no README do desafio (7 dias), preocupação em dividir cada feature por branch e utilizar Git Commit Linter para me manter sempre com boas práticas de commits padronizadas.

Gostaria de excluir da avaliação o requisito de utilização de testes e de funcionalidades extras. Por mais que eu gostaria de implementar, resolvi focar em entregar todos os requisitos funcionais da aplicação primeiro. Dessa forma, poderia cumprir com o que foi solicitado no desafio. Devido a minha rotina atual, gerência de tempo foi algo que precisei priorizar, o que implicou em diversas tomadas de decisão em features da aplicação como também na escolha das tecnologias. Apesar de tudo, fico feliz com o resultado que obtive com 3-4 dias de desenvolvimento.

### Próximas Features

- [ ] Testes Unitários e Testes de Integração
- [ ] Utilizar PostgreSQL como banco de dados
- [ ] Container Docker para a aplicação
- [ ] Container Docker para o banco de dados
- [ ] Deploy na AWS

### Autor

---

<a href="https://blog.rocketseat.com.br/author/thiago/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/56443909?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Augusto Souza 👨‍💻 </b></sub></a>

Coded with ❤️ by Augusto Souza 👋🏽 Get in contact!

[![Linkedin Badge](https://img.shields.io/badge/-Augusto_Souza-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/tgmarinho/)](https://www.linkedin.com/in/augustojs1/)
[![Gmail Badge](https://img.shields.io/badge/-augustojsouza1@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:augustojsouza1@gmail.com)](mailto:augustojsouza1@gmail.com)
