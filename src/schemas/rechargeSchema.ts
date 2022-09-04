import joi from "joi";

export const rechargeValidation = joi.object({
    number: joi.string().min(16).max(16).required(),
    amount: joi.string().min(1).required(),
});