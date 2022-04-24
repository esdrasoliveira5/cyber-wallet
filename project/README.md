# cyber-wallet

## Sumário

- [Descrição](#Descrição)
- [Pré-requisitos](#Pre-requisitos)
  - [Instalação](#Instalação)
  - [Instruções para iniciar o projeto](#Intruções-para-iniciar-o-projeto)
- [Documentação](#Documentação)
  - [Cadastrar um novo carro](#Cadastrar-um-novo-carro)
  - [Lista todos os carros](#Lista-todos-os-carros)
  - [Listar um único carro através do seu id](#Listar-um-único-carro-através-do-seu-id) 
  - [Atualizar o registro de um carro através do seu id](#Atualizar-o-registro-de-um-carro-através-do-seu-id)
  - [Excluir os registros de um carro](#Excluir-os-registros-de-um-carro)
  - [Cadastrar uma nova moto](#Cadastrar-uma-nova-moto)
  - [Lista todos as motos](#Lista-todos-as-motos)
  - [Listar uma única moto através do seu id](#Listar-uma-única-moto-através-do-seu-id)
  - [Atualizar o registro de uma moto através do seu id](#Atualizar-o-registro-de-uma-moto-através-do-seu-id)
  - [Excluir os registros de uma moto](#Excluir-os-registros-de-uma-moto)



<br>

## Descrição

**Objetivo**: Neste projeto foi desenvolvido uma CRUD api para gerenciar uma carteira digital utilizando o banco de dados MongoDB aplicando conceitos de POO.

- Arquitetura REST;
- Banco de Dados MongoDB;
- TypeScript;
- JsonWebToken;
- Bcrypt;
- Testes Automatizados com Mocha, Chai e Sinnon;
- Docker;

## Pré-requisitos

- `npm version 6.14.13`
- `node version 14.17.0`
- `docker version 20.10.13`
- `docker-compose version 1.29.2`

## Instalação

- Clone o repositório
  ```sh
    git clone git@github.com:esdrasoliveira5/Car-Shop.git
- Vá para a pasta da aplicação
  ```sh
    cd Car-Shop

## Instruções para iniciar o projeto

<br>

- Comando para iniciar

  ```sh
  sudo docker-compose up

<br/>

## Documentação

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
                "zipcode": "45687-899",
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
              "zipcode": "45687-899",
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

### **Loga um usuario** 
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
                  "zipcode": "45687-899",
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
                  "zipcode": "45687-899",
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
                "zipcode": "45687-899",
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
##### `PUT` /user/id
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
                "zipcode": "45687-899",
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
                "zipcode": "45687-899",
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
            "password": "$2b$10$/GolCC1IhMuhc4RCReOBdOHMcG3/0qAD2TLVgflxH.T3gcJ0nGRaq",
            "address": {
                "street": "Av. Azaleia",
                "number": "1050A",
                "district": "Florestal",
                "zipcode": "45687-899",
                "city": "Caetanopolis",
                "state": "MG",
                "country": "Brasil"
            },
            "balance": 0,
            "transactions": []
        }
    ```

  <br/>


### **Cadastrar uma nova moto** 
##### `POST` /motorcycles

  <br/>

  Esse endpoint retorna status ``201`` e a moto cadastrada.

  *Obs: Apenas as  tres categorias podem ser cadastradas Street, Custom ou Trail.* 

  - Exemplo `request body` 
    ``` json
      {
        "model": "Honda CG Titan 125",
        "year": 1963,
        "color": "black",
        "buyValue": 3500,
        "category": "Street",
        "engineCapacity": 12
      }
    ```

  - Exemplo `response body`
    ```json
        {
          "model": "Honda CG Titan 125",
          "year": 1963,
          "color": "black",
          "buyValue": 3500,
          "category": "Street",
          "engineCapacity": 125,
          "_id": "6258404d1dabf1c8f26756e0"
        }
    ```
  <br/>

### **Lista todos as motos**
##### `GET` /motorcycles
<br/>

  Retorna status ``200`` e todos as motos cadastradas.

  - Exemplo `response body`
    ```json
        [
            {
              "model": "Honda CG Titan 125",
              "year": 1963,
              "color": "black",
              "buyValue": 3500,
              "category": "Street",
              "engineCapacity": 125,
              "_id": "6258404d1dabf1c8f26756e0"
            },
            ...
        ]
    ```
<br/>

### **Listar uma única moto através do seu id**
##### `GET` /motorcycles/id
  <br/>

  Retorna status ``200`` e todas as motos cadastradas com o id especificado.

  - Exemplo `response body` 
    ``` json
        {
          "model": "Honda CG Titan 125",
          "year": 1963,
          "color": "black",
          "buyValue": 3500,
          "category": "Street",
          "engineCapacity": 125,
          "_id": "6258404d1dabf1c8f26756e0"
        }
    ```

  <br/>

### **Atualizar o registro de uma moto através do seu id**
##### `PUT` /motorcycles/id
  <br/>

  Retorna status ``200`` e a moto atualizada.

  - Exemplo `request body` 
    ``` json
      {
        "model": "Honda CG Titan 125",
        "year": 1963,
        "color": "black",
        "buyValue": 3500,
        "category": "Street",
        "engineCapacity": 125
      }
    ```


  - Exemplo `response body` 
    ``` json
        {
          "model": "Honda CG Titan 125",
          "year": 1963,
          "color": "black",
          "buyValue": 3500,
          "category": "Street",
          "engineCapacity": 125,
          "_id": "6258404d1dabf1c8f26756e0"
        }
    ```

### **Excluir os registros de uma moto**
##### `DELETE` /motorcycles/id
  <br/>

  Retorna status ``204`` sem body.

  - Exemplo `response body` 
    ``` json
    []
    ```

  <br/>
