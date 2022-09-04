import { validateCardPurchase } from "../middlewares/validateCard";
import { validateStore } from "../middlewares/validateStore";
import * as businessMethods from "../repositories/businessRepository";
import * as cardMethods from "../repositories/cardRepository";
import * as paymentMethods from "../repositories/paymentRepository";

export async function purchase(posId: number, number: string, password: string, amount: number) {
    const card = await cardMethods.findByNumber(number);
    await validateCardPurchase(card, password, amount);
    const store = await businessMethods.findById(posId);
    await validateStore(store, card);
    await paymentMethods.insert(number, posId, amount);
}