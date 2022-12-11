import { connection } from "../../database/database.js";

export async function getCustomers ( req, res ) {
    try {
        const promise = await connection.query(`SELECT * FROM customers;`);

        return res.status(201).send(promise.rows);
    } catch ( err ) {
        return res.status(500).send(err.message);
    }
};

export async function getCustomer ( req, res ) {
    const rows = req.locals.rows;

    return res.status(201).send(rows);
};

export async function postCustomer ( req, res ) {
    const { name, phone, cpf, birthday } = req.body;

    /* 
    
    return res.status(400).send(error.details.map(err => err.message))

    const cpfExists = await connection.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);

    if (cpfExists) {
        return res.status(409).send(`This user already exists`);
    } */

    return res.status(201).send(`Customer created successfully`);
};

export async function updateCustomer ( req, res ) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    /* customerValidateMiddleware */

    return res.status(200).send(`Customer updated successfully`)
};