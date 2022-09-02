import { faker } from '@faker-js/faker';
import { findByApiKey } from "../repositories/companyRepository";
import * as employeeMethods from "../repositories/employeeRepository"
import { handleError } from "../middlewares/cardErrorHandler";
import * as cardMethods from "../repositories/cardRepository";
import { encrypt } from "../utils/passwordUtils";
import { cardName, generateDate } from "../utils/cardUtils";


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
    const number: string = faker.finance.creditCardNumber('####-####-####-###L');
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

    const createCard = await cardMethods.insert(cardData);
    //if (!createCard) throw handleError(500, 'Error on creation of card');
}