import joi from "joi";

export const typeCardValidation = joi.object({
    type: joi.string()
        .valid(
            'groceries',
            'restaurant',
            'transport',
            'education',
            'health')
        .required()
})

export const activateValidation = joi.object({
    number: joi.string().min(16).max(16).required(),
    cvc: joi.string().min(3).max(3).required(),
    password: joi.string().min(4).max(4).required()
});

export const blockValidation = joi.object({
    number: joi.string().min(16).max(16).required(),
    password: joi.string().min(4).max(4).required()
});
