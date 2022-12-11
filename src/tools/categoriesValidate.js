import Joi from "joi";

export const categoriesSchema = Joi.object({
    name: Joi
            .string()
            .min(1)
            .required()
}).options({ abortEarly: false });