___
#### This is my first Typescript project. A server for a benefit card system. Uses cryptr, dayjs, dotenv, express, express-async-errors, faker, joi, pg and Node.
___
## How to use?

- to create a card - "post/localhost:5000/create-card/:benefitProviderCompanyId"

  - headers -  valid enterprise API key:
x-api-key: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0

  - body - type of card:
{
  "type": "transport"
}
***
- to activate a card - "put/localhost:5000/activate"

  - body - number of card, cvc and password:
{
  "number": "2362223903310957",
  "cvc": "973",
  "password": "1234"
}
***
- to get balance from account - "get/localhost:5000/transactions"

  - body - number of card:
{
  "cardNumber": "2362223903310957"
}
***
- to block card - "put/localhost:5000/block"

  - body - number of card and cvc:
{
  "number": "2362223903310957",
  "password": "1234"
}
***
- to unblock card - "put/localhost:5000/unblock"

  - body - number of card and cvc:
{
  "number": "2362223903310957",
  "password": "1234"
}
***
- to recharge a card - "post/localhost:5000/recharge"

  - headers -  valid enterprise API key:
x-api-key: zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0

  - body - number of card and amount to recharge:
{
  "number": "2362223903310957",
  "amount": "5000"
}
***
- to buy benefits with card - "post/localhost:5000/buy:PointOfSaleId"

  - body - number of card, password and value of transaction:
{
  "number": "2362223903310957",
  "password": "1234",
  "amount": "1000"
}
***
