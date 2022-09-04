import { handleError } from "../middlewares/cardErrorHandler";
import * as cardMethods from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import * as rechargeMethods from "../repositories/rechargeRepository";
import { expiredCard } from "../utils/cardUtils";

export async function rechargeService(apiKey: string, cardNumber: string, amount: number) {
    const checkApiKey = await findByApiKey(apiKey);
    if (!checkApiKey) throw handleError(404, "Invalid API Key!");
    const card = await cardMethods.findByNumber(cardNumber);
    if (!card) throw handleError(404, "Card not registered!");
    if (card.isBlocked) throw handleError(401, "Can't recharge blocked card!");
    if (expiredCard(card.expirationDate)) throw handleError(401, "Expired card, can't recharge!");
    await rechargeMethods.insert(cardNumber, amount);
}