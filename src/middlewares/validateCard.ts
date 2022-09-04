import { handleError } from "./cardErrorHandler";
import { expiredCard } from "../utils/cardUtils";
import { decrypt } from "../utils/passwordUtils";
import { getTransactions } from "../services/cardServices";

export async function validateCardPurchase(card: any, password: any, amount: number) {
    if (!card)
        throw handleError(404, "Purchase failed, check your card informations and try again!");
    if (card.isBlocked)
        throw handleError(401, "Purchase failed, card is blocked!");
    if (expiredCard(card.expirationDate))
        throw handleError(401, "Purchase failed, card has expired!");
    if (password !== null) {
        if (card.password === '')
            throw handleError(401, "Purchase failed, card wasn't activated!");
        if (decrypt(card.password) !== password)
            throw handleError(401, "Purchase failed, wrong password!");
    }
    const { balance }: { balance: number } = await getTransactions(card.number);
    if (balance - amount < 0) throw handleError(406, "Purchase failed, insufficient balance!");
}