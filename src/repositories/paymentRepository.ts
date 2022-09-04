import { connection } from "../../database/database";

export interface Payment {
  id: number;
  cardId: number;
  businessId: number;
  timestamp: Date;
  amount: number;
}
export type PaymentWithBusinessName = Payment & { businessName: string };
export type PaymentInsertData = Omit<Payment, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
  const result = await connection.query<PaymentWithBusinessName, [number]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
    FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
    WHERE "cardId"=$1
    `,
    [cardId]
  );

  return result.rows;
}
export async function findByCardNumber(cardNumber: string) {
  const result = await connection.query<PaymentWithBusinessName, [string]>(
    `SELECT 
      payments.*,
      businesses.name as "businessName"
    FROM payments 
      JOIN businesses ON businesses.id=payments."businessId"
    WHERE "cardNumber"=$1
    `,
    [cardNumber]
  );

  return result.rows;
}

export async function insert(cardNumber: string, posId: number, amount: number) {
  connection.query<any, [string, number, number]>(
    `INSERT INTO payments ("cardNumber", "businessId", amount) VALUES ($1, $2, $3)`,
    [cardNumber, posId, amount]
  );
}
