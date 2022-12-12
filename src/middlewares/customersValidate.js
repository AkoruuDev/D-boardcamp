import { connection } from "../../database/database.js";
import { customerSchema } from "../tools/customerSchema.js";

export async function customersValidate ( req, res, next ) {
    const { name, phone, cpf, birthday } = req.body;

    const { error } = customerSchema.validate({ name, phone, cpf, birthday });
    if ( error ) {
        return res.status(422).send(error.details.map(err => err.message));
    }

    try {
        const { rows } = await connection.query(`SELECT * FROM customers WHERE cpf=$1;`, [cpf]);

        if ( rows.length !== 0 ) {
            return res.status(409).send(`This user already exists`);
        }
    } catch ( err ) {
        return res.status(500).send(err.message);
    }

    res.locals.body = { name, phone, cpf, birthday };
    next();
};