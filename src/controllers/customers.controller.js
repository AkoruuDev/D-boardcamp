import { connection } from "../../database/database.js";

export async function getCustomers ( req, res ) {
    const promise = await connection.query(`SELECT * FROM customers`);

    return res.status(201).send(promise);
};

export async function getCustomer ( req, res ) {
    const { id } = req.params;

    const promise = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id]);

    if (!promise) {
        return res.status(404).send(`This user doesn't exists`);
    }

    return res.status(201).send(promise);
};

export async function postCustomer ( req, res ) {
    const { name, phone, cpf, birthday } = req.body;

    /* customerSchema = Joi.object({
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
    }); 
    
    return res.status(400).send(error.details.map(err => err.message))

    const cpfExists = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);

    if (cpfExists) {
        return res.status(409).send(`This user already exists`);
    } */

    return res.status(201).send(`Customer created successfully`);
};

export async function updateCustomer ( req, res ) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    /* customerValidateMiddleware */

    res.status(200).send(`Customer updated successfully`)
};