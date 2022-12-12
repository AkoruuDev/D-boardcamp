import { connection } from "../../database/database.js";
import { cpfSchema, idSchema } from "../tools/customerSchema.js";

export async function getCustomers ( req, res ) {
    const { cpf } = req.query;

    const { error } = cpfSchema.validate({ cpf });
    if ( error ) {
        return res.status(422).send(error.details.map(err => err.message));
    }
    
    try {
        if ( cpf ) {
            const promise = await connection.query(`SELECT * FROM customers WHERE POSITION ($1 IN cpf) = 1;`, [cpf]);
    
            return res.status(201).send(promise.rows);
        } else {
            const promise = await connection.query(`SELECT * FROM customers;`);
    
            return res.status(201).send(promise.rows);
        }
    } catch ( err ) {
        return res.status(500).send(err.message);
    }
};

export async function getCustomer ( req, res ) {
    const rows = res.locals.params;

    return res.status(201).send(rows);
};

export async function postCustomer ( req, res ) {
    const { name, phone, cpf, birthday } = res.locals.body;

    try {
        await connection.query(`INSERT INTO customers ( name, phone, cpf, birthday ) VALUES ( $1, $2, $3, $4 );`, [name, phone, cpf, birthday]);

        return res.status(201).send(`Customer created successfully`);
    } catch ( err ) {
        return res.status(500).send(err.message);
    }
};

export async function updateCustomer ( req, res ) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = res.locals.body;

    const { error } = idSchema.validate({ id });
    if ( error ) {
        return res.status(422).send(error.details.map(err => err.message))
    }

    try {
        await connection.query(`UPDATE customers SET (name = $1, phone = $2, cpf = $3, birthday = $4) WHERE id = $5;`, [name, phone, cpf, birthday, cpf]); // verify

        return res.status(200).send(`Customer updated successfully`)
    } catch ( error ) {
        return res.status(500).send(error.message)
    }
};