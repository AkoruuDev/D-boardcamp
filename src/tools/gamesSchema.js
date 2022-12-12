import Joi from "joi";

export const gameSchema = Joi.object({
    name: Joi
            .string()
            .required()
            .min(1),
    stockTotal: Joi
            .number()
            .required()
            .min(1),
    pricePerDay: Joi
            .number()
            .required()
            .min(1) 
});