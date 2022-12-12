import Joi from "joi";

export const customerSchema = Joi.object({
    cpf: Joi
            .number()
            .min(11111111111)
            .max(99999999999)
            .required(),
    phone: Joi
            .number()
            .min(1111111111)
            .max(99999999999)
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

export const cpfSchema = Joi.object({
        cpf: Joi
                .number()
}).options({ abortEarly: false });