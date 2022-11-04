# Description

Valex simulates an API that manages a benefit card, generally available by companies to their employees.


<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png" height="120px">
</p>
<h1 align="center">
  Valex
</h1>

## Built With

![Post Gres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white)

## Features

-   Create cards
-   Activate / Block / Unlock a card
-   Get the card balance and transactions
-   Recharge a card
-   Make card payments

## To run on deploy

* Use the same instructions on [Using the API](#using-the-api) but replacing `localhost:5000` by:

```http
https://back-projeto-valex.herokuapp.com/
```
## To run Locally

* 1 - Open terminal and clone the project

```bash
  git clone https://github.com/rudarabello/projeto18-valex
```

* 2 - Go to the project directory

```bash
  cd projeto18-valex
```

* 3 - Install dependencies

```bash
  npm install
```

* 4 -  Go to script and create database

```bash
  cd database
```
```bash
  bash ./create-database
```
* 5 - Add .env file with (you can check .env-example):

```bash
DATABASE_URL= postgres://UserName:Password@Hostname:5432/DatabaseName

PORT= 5000
```

* 6 - Start the server

```bash
  npm run dev
```

## Using the API

To test i recommend the use of Thunder Client

<img src="https://img.shields.io/badge/ThunderClient-4B275F?style=for-the-badge&logo=thunder&logoColor=white" height="30px"/>

### POST - Create a card

To create a card you should have:

- Benefit provider company Id (you can use "1",  according seed data) as params:

```bash
localhost:5000/create-card/1
```
- X-api-key as a value on headers(you can use the value bellow, according seed data):

```bash
x-api-key: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
```
- And the type of card (as defined bellow):

* Example

```json
{ "type": "transport" }
```

| Params     | Type   | Description           |
| :---------- | :------- | :-------------------- |
| `id company` | `integer` | **Required**  |


| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required** |


| Body         | Type     | Description                              |
| :------------| :------- | :--------------------------------------- |
| `type`       | `object` | **Required** `Valid types: [groceries, restaurant, transport, education, health]`       |

###  PUT - Activate a card

```bash
 localhost:5000/activate
```

- The body should be contains:

| Body             | Type     | Description        |
| :--------------- | :------- | :----------------- |
| `cardId`         | `string`| **Required**       |
| `password`       | `string` | **Required**       |
| `securityCode`   | `string` | **Required**       |

* Example

```json
{ "number": "2362223903310957", "cvc": "973", "password": "1234" }
```

### GET - card balance

```bash
localhost:5000/transactions
```

- The body should be contains:

| Body      | Type    | Description  |
|:---------- |:-------- |:------------|
| `cardNumber` |`string` |**Required** |

* Example

```json
{ "cardNumber": "2362223903310957" }
```
### PUT - Block a card

```bash
localhost:5000/block
```

- The body should be contains:

|    Body        |   Type   | Description     |
| :----------      | :--------| :------------------|
| `number`         | `string`| **Required**        | 
| `password`       | `string` | **Required**    |

* Example

```json
 {"number": "2362223903310957", "password": "1234" }
```


### PUT - Unlock a card

```bash
localhost:5000/unblock
```

- The body should be contains:

|    Body        |   Type   | Description     |
| :----------      | :--------| :------------------|
| `number`         | `string`| **Required**        | 
| `password`       | `string` | **Required**    |

* Example

```json
 {"number": "2362223903310957", "password": "1234" }
```

### POST - Recharge a card

```bash
localhost:5000/recharge
```

- You will need X-api-key as a value on headers(you can use the value bellow, according seed data):

```bash
x-api-key: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0
```

| Headers     | Type     | Description  |
| :---------- | :------- | :------------ |
| `x-api-key` | `string` | **Required** |
| `number`    | `string`| **Required**   |
| `amount`    | `string` | **Required**  |

- The body should be contains:

```json
{ "number": "2362223903310957", "amount": "5000" }
```

### POST - To buy with card

- Params should be contains:

|    Params        |   Type   | Description     |
| :----------      | :--------| :---------------|
| `PointOfSaleId`     | `integer` | **Required**| 


```bash
localhost:5000/buy/1
```

- The body should be contains:

| Body             | Type      | Description       |
| :--------------- | :-------- | :---------------- |
| `number`         | `string` | **Required**      |
| `password`       | `string`  | **Required**      |
| `amount`         | `string` | **Required**      |

```json
{ "number": "2362223903310957", "password": "1234", "amount": "1000" }
```

### Made by:

<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/ruda-rabello-da-silva/"><img src="https://avatars.githubusercontent.com/u/95311365?s=96&v=4" width="80px;" alt="Rudá Rabello"/><br /><sub><b>Rudá Rabello</b></sub></a><br /><a href="https://www.linkedin.com/in/ruda-rabello-da-silva/"title="Code">💻</a></td></td>
</table>
