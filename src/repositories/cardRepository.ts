import { connection } from "../../database/database";
import { handleError } from "../middlewares/cardErrorHandler";

export type TransactionTypes =
  | "groceries"
  | "restaurant"
  | "transport"
  | "education"
  | "health";

export interface Card {
  id: number;
  employeeId: number;
  number: string;
  cardholderName: string;
  securityCode: string;
  expirationDate: string;
  password?: string;
  isVirtual: boolean;
  originalCardId?: number;
  isBlocked: boolean;
  type: TransactionTypes;
}

export type CardInsertData = Omit<Card, "id">;
export type CardUpdateData = Partial<Card>;

export async function find() {
  const result = await connection.query<Card>("SELECT * FROM cards");
  return result.rows;
}

export async function findById(id: number) {
  const result = await connection.query<Card, [number]>(
    "SELECT * FROM cards WHERE id=$1",
    [id]
  );

  return result.rows[0];
}
export async function findByNumber(number: string) {
  const result = await connection.query<Card, [string]>(
    "SELECT * FROM cards WHERE number=$1",
    [number]
  );

  return result.rows[0];
}
export async function findByTypeAndEmployeeId(
  type: TransactionTypes,
  employeeId: number
) {
  const result = await connection.query<Card, [TransactionTypes, number]>(
    `SELECT * FROM cards WHERE type=$1 AND "employeeId"=$2`,
    [type, employeeId]
  );

  return result.rows[0];
}
export async function findByCardDetails(
  number: string,
  cardholderName: string,
  expirationDate: string
) {
  const result = await connection.query<Card, [string, string, string]>(
    ` SELECT 
        * 
      FROM cards 
      WHERE number=$1 AND "cardholderName"=$2 AND "expirationDate"=$3`,
    [number, cardholderName, expirationDate]
  );

  return result.rows[0];
}
export async function insert(cardData: CardInsertData) {
  const {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password,
    isVirtual,
    originalCardId,
    isBlocked,
    type,
  } = cardData;

  const result = await connection.query(
    `
    INSERT INTO cards ("employeeId", number, "cardholderName", "securityCode",
      "expirationDate", password, "isVirtual", "originalCardId", "isBlocked", type)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `,
    [
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    ]
  );
  if (!result) throw handleError(500, 'Error on creation of card');
}
export async function update(number: string, password: string) {
  connection.query(
    `
    UPDATE cards
      SET password = $2, "isBlocked" = false
    WHERE $1=number
  `,
    [number, password]
  );
}
export async function remove(id: number) {
  connection.query<any, [number]>("DELETE FROM cards WHERE id=$1", [id]);
}
export async function blockCard(number: string) {
  connection.query(
    `
    UPDATE cards
      SET "isBlocked" = true
      WHERE number = $1
  `,[number]
  );
}
export async function unBlockCard(number: string) {
  connection.query(
    `
    UPDATE cards
      SET "isBlocked" = false
      WHERE number = $1
  `,[number]
  );
}