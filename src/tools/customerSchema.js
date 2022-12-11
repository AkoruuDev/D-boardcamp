import Joi from "joi";

export const customerSchema = Joi.object({
    cpf: Joi
            .number()
            .min(11)
            .max(11)
            .required(),
    phone: Joi
            .number()
            .min(10)
            .max(11)
            .required(),
    name: Joi
            .string()
            .min(1)
            .required(),
    birthday: Joi
            .date()
            .required()
}).options({ abortEarly: false });

export const idSchema = Joi.object({
        id: Joi
                .number()
                .min(1)
                .required()
}).options({ abortEarly: false });