# Rick and Morty Episodes Manager
Aplicação Web desenvolvida em ReactJS para explorar e gerenciar todos os episódios da série Rick and Morty, utilizando a Rick and Morty API.

## Como rodar localmente?

Pré-requisitos:

* NodeJS v20.18.1 +
    - Instale através do [NVM - Node Version Manager](https://github.com/nvm-sh/nvm)
      - Depois de instalar o nvm, run ```nvm install 20 ```, seguido por ```nvm use 20``` vai instalar o node 20 e usar o node 20
      - O projeto roda nas versões mais atuais do NodeJS. O projeto foi testado e funciona com o node v20.18.1
    - Veja as versões de node oficiais [Node.js official website](https://nodejs.org/en/download/releases/) ou rode o comando ```nvm list available ```
* Após node instalado rode: ```npm install ``` e depois ```npm run dev ```
* Acesse o projeto na porta: http://localhost:5173/
* Para rodar testes use  ```npm run test ```
  - Veja no [Package.json](https://github.com/gabrielcarlossl/azs-web-rickandmorty/blob/main/package.json) os scripst disponíveis.

## Funcionalidades
Listagem de episódios com:

- Número do episódio

- Nome

- Data de exibição

- Quantidade de personagens participantes

## Detalhes completos do episódio:

Lista de personagens com:

- Foto

- Nome

- Espécie

- Status (Vivo, Morto ou Desconhecido)

## Ações 

- Favoritar / Desfavoritar episódios

- Marcar episódios como Vistos

- Listar apenas episódios favoritos

- Buscar episódios por nome

  ![botões de ação](https://github.com/user-attachments/assets/bb58f892-5320-450c-be34-0c0e6e197d7b)


### Tecnologias
- ReactJS com Typescript

- React Router Dom

- Redux Sagas

- Material UI

- Integração com a [Rick and Morty API](https://rickandmortyapi.com)

- Vitest com React Testing Library

- Husky: Pre push


#### Melhorias

- Criação de tela de login utilizando autenticação com JSON Server API
- Adição de Comentários na exibição de detalhes de episódio
- Adição de avaliação de episódio
- Adicionar mais testes no redux e testes de componentes
- Adicionar tela de episódios assistidos (vistos)
