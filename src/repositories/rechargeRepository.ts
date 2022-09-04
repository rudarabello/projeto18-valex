import { connection } from "../../database/database";

export interface Recharge {
  id: number;
  cardNumber: string;
  timestamp: Date;
  amount: number;
}

export async function findByCardId(cardId: number) {
  const result = await connection.query<Recharge, [number]>(
    `SELECT * FROM recharges WHERE "cardId"=$1`,
    [cardId]
  );

  return result.rows;
}
export async function findByCardNumber(cardId: string) {
  const result = await connection.query<Recharge, [string]>(
    `SELECT * FROM recharges WHERE "cardNumber"=$1`,
    [cardId]
  );

  return result.rows;
}
export async function insert(cardNumber: string, amount: number) {
  connection.query<any, [string, number]>(
    `INSERT INTO recharges ("cardNumber", amount) VALUES ($1, $2)`,
    [cardNumber, amount]
  );
}
