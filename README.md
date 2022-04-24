# cyber-wallet

## Sumário

- [Descrição](#Descrição)
- [Pré-requisitos](#Pre-requisitos)
  - [Instalação](#Instalação)
  - [Instruções para iniciar o projeto](#Intruções-para-iniciar-o-projeto)
- [Documentação](#Documentação)
  - [Abre a documentação com Swagger](#Abre-a-documentação-com-Swagger)
  - [Cadastra um novo usuario](#Cadastra-um-novo-usuario)
  - [Loga um usuário](#Loga-um-usuário) 
  - [Lista todos usuarios](#Lista-todos-usuarios)
  - [Lista um usuario pelo seu id](#Lista-um-usuario-pelo-seu-id)
  - [Atualiza um usuario pelo id](#Atualiza-um-usuario-pelo-id)
  - [Atualiza o saldo adiciona a transação](#Atualiza-o-saldo-adiciona-a-transação)
  - [Deletar um usuario](#Deletar-um-usuario)



<br>

## Descrição

**Objetivo**: Neste projeto foi desenvolvido uma CRUD api para gerenciar uma carteira digital utilizando o banco de dados MongoDB aplicando conceitos de POO e SOLID.

- Arquitetura REST;
- Banco de Dados MongoDB;
- TypeScript;
- Express;
- Mongoose;
- Bcrypt;
- JsonWebToken;
- Testes Automatizados com Mocha, Chai e Sinnon;
- Docker;
- Docker compose;
- Swagger;


## Pré-requisitos

- `npm version 6.14.13`
- `node version 14.17.0`
- `docker version 20.10.13`
- `docker-compose version 1.29.2`

## Instalação

- Clone o repositório
  ```sh
    git clone git@github.com:esdrasoliveira5/cyber-wallet.git

- Vá para a pasta da aplicação
  ```sh
    cd cyber-wallet/project 

- Instale as dependencias
  ```sh
    npm install 


## Instruções para iniciar o projeto

<br>

- Comando para iniciar com docker

  ```sh
  sudo docker-compose up

- Acesse pelo navegador 
  ```sh
    http://localhost:3001/

- Comando para iniciar pelo node

  ```sh
  npm run start

- Acesse pelo navegador 
  ```sh
    http://localhost:3001/

<br/>

## Instruções para testar o projeto

<br>

- Testes unitarios

  ```sh
  npm run test:unit
  
- Testes de integração  
  ```sh
    npm run test:integration

- Verificar cobertura dos testes

  ```sh
  npm run test:coverage

## Documentação

<br/>

### **Abre a documentação com Swagger** 
##### `GET` /api-docs

  <br/>

  Esse endpoint permite testar a api com o Swagger;


  <br/>

### **Cadastra um novo usuario** 
##### `POST` /user

  <br/>

  Esse endpoint retorna status ``201`` e o usuario cadastrado.

  - Exemplo `request body` 
    ``` json
        {
            "name": "Luisa",
            "lastName": "Oliveira",
            "email": "luisa@email.com",
            "contact": "+5511987654321",
            "password": "maria_password",
            "address": {
                "street": "Av. Azaleia",
                "number": "1050A",
                "district": "Florestal",
                "zipcode": "01001000",
                "city": "Caetanopolis",
                "state": "MG",
                "country": "Brasil"
            }
        }
    ```

  - Exemplo `response body`
    ```json
      {
          "name": "Luisa",
          "lastName": "Oliveira",
          "email": "luisa@email.com",
          "contact": "+5511987654321",
          "password": "$2b$10$/GolCC1IhMuhc4RCReOBdO3u0r4kxA253wg/OfvzQgBAfyKuIFX7.",
          "address": {
              "street": "Av. Azaleia",
              "number": "1050A",
              "district": "Florestal",
              "zipcode": "01001000",
              "city": "Caetanopolis",
              "state": "MG",
              "country": "Brasil"
          },
          "balance": 0,
          "transactions": [],
          "_id": "6264bfcebab4601fd42c7181"
      }
    ```
  <br/>

### **Loga um usuário** 
##### `POST` /user/login

  <br/>

  Esse endpoint retorna status ``200`` e o usuario com um token.

  - Exemplo `request body` 
    ``` json
        {
            "email": "luisa@email.com",
            "password": "maria_password"
        }
    ```

  - Exemplo `response body`
    ```json
      {
          "user": {
              "_id": "6264bfcebab4601fd42c7181",
              "name": "Luisa",
              "lastName": "Oliveira",
              "email": "luisa@email.com",
              "contact": "+5511987654321",
              "password": "$2b$10$/GolCC1IhMuhc4RCReOBdO3u0r4kxA253wg/OfvzQgBAfyKuIFX7.",
              "address": {
                  "street": "Av. Azaleia",
                  "number": "1050A",
                  "district": "Florestal",
                  "zipcode": "01001000",
                  "city": "Caetanopolis",
                  "state": "MG",
                  "country": "Brasil"
              },
              "balance": 0,
              "transactions": []
          },
          "token": "bearer token"
      }
    ```
  <br/>

### **Lista todos usuarios**
##### `GET` /user
<br/>

  Retorna status ``200`` e todos os usuarios cadastrados.

  - Exemplo `request headers` 
    ``` json
        {
            "Authorization": "bearer token",
        }
    ```

  - Exemplo `response body`
    ```json
        [
          {
              "_id": "6264bfcebab4601fd42c7181",
              "name": "Luisa",
              "lastName": "Oliveira",
              "email": "luisa@email.com",
              "contact": "+5511987654321",
              "password": "$2b$10$/GolCC1IhMuhc4RCReOBdO3u0r4kxA253wg/OfvzQgBAfyKuIFX7.",
              "address": {
                  "street": "Av. Azaleia",
                  "number": "1050A",
                  "district": "Florestal",
                  "zipcode": "01001000",
                  "city": "Caetanopolis",
                  "state": "MG",
                  "country": "Brasil"
              },
              "balance": 0,
              "transactions": []
          },
            ...
        ]
    ```
<br/>

### **Lista um usuario pelo seu id**
##### `GET` /user/:id
  <br/>

  Retorna status ``200`` e o usuario cadastrado com o id especificado.

  - Exemplo `request headers` 
    ``` json
        {
            "Authorization": "bearer token",
        }
    ```

  - Exemplo `response body` 
    ``` json
        {
            "_id": "6264bfcebab4601fd42c7181",
            "name": "Luisa",
            "lastName": "Oliveira",
            "email": "luisa@email.com",
            "contact": "+5511987654321",
            "password": "$2b$10$/GolCC1IhMuhc4RCReOBdO3u0r4kxA253wg/OfvzQgBAfyKuIFX7.",
            "address": {
                "street": "Av. Azaleia",
                "number": "1050A",
                "district": "Florestal",
                "zipcode": "01001000",
                "city": "Caetanopolis",
                "state": "MG",
                "country": "Brasil"
            },
            "balance": 0,
            "transactions": []
        }
    ```

  <br/>

### **Atualiza um usuario pelo id**
##### `PUT` /user/:id
  <br/>

  Retorna status ``200`` e o usuario atualizado.

  - Exemplo `request headers` 
    ``` json
        {
            "Authorization": "bearer token",
        }
    ```

  - Exemplo `request body` 
    ``` json
        {
            "name": "Luisa",
            "lastName": "Oliveira",
            "email": "luisa@email.com",
            "contact": "+5511987654321",
            "password": "luisa_password",
            "address": {
                "street": "Av. Azaleia",
                "number": "1050A",
                "district": "Florestal",
                "zipcode": "01001000",
                "city": "Caetanopolis",
                "state": "MG",
                "country": "Brasil"
            }
        }
    ```


  - Exemplo `response body` 
    ``` json
        {
            "_id": "6264bfcebab4601fd42c7181",
            "name": "Luisa",
            "lastName": "Oliveira",
            "email": "luisa@email.com",
            "contact": "+5511987654321",
            "password": "$2b$10$/GolCC1IhMuhc4RCReOBdOHMcG3/0qAD2TLVgflxH.T3gcJ0nGRaq",
            "address": {
                "street": "Av. Azaleia",
                "number": "1050A",
                "district": "Florestal",
                "zipcode": "01001000",
                "city": "Caetanopolis",
                "state": "MG",
                "country": "Brasil"
            },
            "balance": 0,
            "transactions": []
        }
    ```

### **Atualiza o saldo adiciona a transação**
##### `PUT` /user/transaction
  <br/>

  Retorna status ``200`` e o usuario com o saldo e as transações atualizadas.
  *Obs: Apenas 3 tipos de transacoes disponiveis, sao elas "payment", "transfer" e "deposit"*

  - Exemplo `request headers` 
    ``` json
        {
            "Authorization": "bearer token",
        }
    ```

  - Exemplo `request body` 
    ``` json
        {
            "type": "transfer",
            "receiver": {
                "name": "Maria",
                "lastName": "Oliveira",
                "email": "maria@email.com",
                "contact": "+5511987654321"
            },
            "transmitter": {
                "name": "Pedro",
                "lastName": "Pereira",
                "email": "pedro@email.com",
                "contact": "+5511963852741"
            },
            "amount": 100
        }
    ```

  - Exemplo `request body` 
    ``` json
        {
            "type": "deposit",
            "receiver": {
                "name": "Pedro",
                "lastName": "Pereira",
                "email": "pedro@email.com",
                "contact": "+5511963852741"
            },
            "transmitter": {
                "name": "Pedro",
                "lastName": "Pereira",
                "email": "pedro@email.com",
                "contact": "+5511963852741"
            },
            "amount": 60
        }
    ```

  - Exemplo `request body` 
    ``` json
        {
            "type": "payment",
            "receiver": {
                "name": "Pedro",
                "lastName": "Pereira",
                "email": "pedro@email.com",
                "contact": "+5511963852741"
            },
            "transmitter": {
                "name": "Maria",
                "lastName": "Oliveira",
                "email": "maria@email.com",
                "contact": "+5511987654321"
            },
            "amount": 500
        }
    ```
  - Exemplo `response body` 
    ``` json
        {
            "_id": "6264c85fbab4601fd42c718d",
            "name": "Pedro",
            "lastName": "Pereira",
            "email": "pedro@email.com",
            "contact": "+5511963852741",
            "password": "$2b$10$/GolCC1IhMuhc4RCReOBdO0eFeos76KTfw8Huxtkx4CYUTRLW7.GG",
            "address": {
                "street": "Rua das Flores",
                "number": "500",
                "district": "Santo Agostinho",
                "zipcode": "01001000",
                "city": "Belo Horizonte",
                "state": "MG",
                "country": "Brasil"
            },
            "balance": 200,
            "transactions": [
                {
                    "type": "deposit",
                    "receiver": {
                        "name": "Pedro",
                        "lastName": "Pereira",
                        "email": "pedro@email.com",
                        "contact": "+5511963852741"
                    },
                    "transmitter": {
                        "name": "Pedro",
                        "lastName": "Pereira",
                        "email": "pedro@email.com",
                        "contact": "+5511963852741"
                    },
                    "amount": 50,
                    "date": "2022-04-24T04:29:02.860Z"
                },
                {
                    "type": "transfer",
                    "receiver": {
                        "name": "Maria",
                        "lastName": "Oliveira",
                        "email": "maria@email.com",
                        "contact": "+5511987654321"
                    },
                    "transmitter": {
                        "name": "Pedro",
                        "lastName": "Pereira",
                        "email": "pedro@email.com",
                        "contact": "+5511963852741"
                    },
                    "amount": 50,
                    "date": "2022-04-24T04:46:56.840Z"
                },
            ]
        }
    ```

  <br/>

### **Deletar um usuario**
##### `DELETE` /user/:id
  <br/>

  - Exemplo `request headers` 
    ``` json
        {
            "Authorization": "bearer token",
        }
    ```

  Retorna status ``204`` sem body.

  - Exemplo `response body` 
    ``` json
    []
    ```

  <br/>
