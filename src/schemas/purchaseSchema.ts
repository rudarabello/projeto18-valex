import joi from "joi";

export const purchaseValidation = joi.object({
    number: joi.string().min(16).max(16).required(),
    password: joi.string().min(4).max(4).required(),
    amount: joi.string().min(1).required()
});