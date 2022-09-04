import { faker } from '@faker-js/faker';
import { handleError } from "../middlewares/cardErrorHandler";
import * as cardMethods from "../repositories/cardRepository";
import { findByApiKey } from "../repositories/companyRepository";
import * as employeeMethods from "../repositories/employeeRepository";
import * as paymentMethods from "../repositories/paymentRepository";
import * as rechargeMethods from "../repositories/rechargeRepository";
import { cardName, expiredCard, generateDate } from "../utils/cardUtils";
import { decrypt, encrypt } from "../utils/passwordUtils";


export async function createCard(
    apiKey: any,
    employeeId: number,
    type: cardMethods.TransactionTypes
) {
    const checkApiKey = await findByApiKey(apiKey);
    if (!checkApiKey) throw handleError(404, "Invalid API Key!");
    const checkEmployee = await employeeMethods.findById(employeeId);
    if (!checkEmployee) throw handleError(404, "Employee not registered!");
    const checkCards = await cardMethods.findByTypeAndEmployeeId(type, employeeId);
    if (checkCards) throw handleError(409, `The employee already have a ${type} card type`);
    const cardholderName: string = cardName(checkEmployee.fullName)
    const number: string = faker.finance.creditCardNumber('###############L');
    const expirationDate = generateDate();
    const CVC: string = faker.finance.creditCardCVV();
    const securityCode = encrypt(CVC);
    const cardData: cardMethods.CardInsertData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: '',
        isVirtual: true,
        isBlocked: true,
        type,
    };
    await cardMethods.insert(cardData);
    const infoFromCard = {
        number: number,
        cvc: CVC,
    }
    return infoFromCard;

}
export async function activateCard(
    number: string, cvc: string, password: string
) {
    const card = await cardMethods.findByNumber(number);
    if (!card) throw handleError(404, `Card not registered!`);
    if (expiredCard(card.expirationDate)) throw handleError(401, "This card has expired!");
    if (decrypt(card.securityCode) !== cvc) throw handleError(401, "Wrong CVC!");
    if (card.password) throw handleError(409, "This card is active!");
    const encryptedPass = encrypt(password)
    await cardMethods.update(number, encryptedPass);
}
export async function getTransactions(cardNumber: string) {
    const recharges = await rechargeMethods.findByCardNumber(cardNumber);
    if (recharges.length === 0) {
        return {
            balance: 0,
            recharges: "No recharges were made!"
        }
    }
    let balance = 0;
    recharges.forEach((element: { amount: number; }) => {
        balance += element.amount;
    });
    const payments = await paymentMethods.findByCardNumber(cardNumber);
    if (payments.length === 0) {
        return {
            balance,
            recharges: recharges,
            transactions: "No payments were made!"
        }
    }
    payments.forEach((element: { amount: number; }) => {
        balance -= element.amount;
    });
    const result = {
        balance,
        recharges: recharges,
        transactions: payments
    };
    return result;
}
export async function blockCard(number: string, password: string) {
    const card = await cardMethods.findByNumber(number);
    if (!card) throw handleError(404, "Card not registered!");
    if (card.password === '') throw handleError(401, "Card wasn't activated!");
    if (password !== decrypt(card.password)) throw handleError(401, "Wrong password!");
    if (card.isBlocked) throw handleError(409, "Card already blocked!");
    if (expiredCard(card.expirationDate)) throw handleError(401, "This card has expired!");
    await cardMethods.blockCard(number);
}
export async function unBlockCard(number: string, password: string) {
    const card = await cardMethods.findByNumber(number);
    if (!card) throw handleError(404, "Card not registered!");
    if (card.password === '') throw handleError(401, "Card wasn't activated!");
    if (password !== decrypt(card.password)) throw handleError(401, "Wrong password!");
    if (!card.isBlocked) throw handleError(409, "Card is already active!");
    if (expiredCard(card.expirationDate)) throw handleError(401, "This card has expired!");
    await cardMethods.unBlockCard(number);
}