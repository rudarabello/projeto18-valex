import { handleError } from "./cardErrorHandler";

export async function validateStore(store: any, card: any) {
    if (!store) throw handleError(404, "Purchase failed, store not registered!");
    if (store.type !== card.type)
        throw handleError(409, "Purchase failed, this store doesn't accept this type of card!");
}