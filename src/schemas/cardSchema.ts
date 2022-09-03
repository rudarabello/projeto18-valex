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
    number: joi.string().min(19).max(19).required(),
    cvc: joi.string().min(3).max(3).required(),
    password: joi.string().min(4).max(4).required()
});




//         if (code === 2) {
//             const cardSchema = joi.object({
//                 id: joi.number().min(1).required(),
//                 cvc: joi.string().min(3).max(3).required(),
//                 password: joi.string().min(4).max(4).required()
//             });

//             const { error } = cardSchema.validate(req.body, { abortEarly: false });

//             if (error) return res.status(422).send(error.details.map(detail => detail.message));

//             next();
//         }

//         if (code === 3) {
//             const cardSchema = joi.object({
//                 id: joi.number().min(1).required(),
//                 password: joi.array().min(1).required()
//             });

//             const { error } = cardSchema.validate(req.body, { abortEarly: false });

//             if (error) return res.status(422).send(error.details.map(detail => detail.message));

//             next();
//         }

//         if (code === 4) {
//             const cardSchema = joi.object({
//                 password: joi.string().min(4).max(4).required()
//             });

//             const { error } = cardSchema.validate(req.body);

//             if (error) return res.status(422).send(error.details.map(detail => detail.message));

//             next();
//         }
//     }
// }

// export default cardValidation;