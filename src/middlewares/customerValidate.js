import { connection } from "../../database/database.js";
import { idSchema } from "../tools/customerSchema.js";

export async function customerValidate ( req, res, next) {
    const { id } = req.params;

    const { error } = idSchema.validate({ id });
    if ( error ) {
        return res.status(422).send(error.details.map(err => err.message));
    }

    let way;
    try {
        const { rows } = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
        
        if ( rows.length === 0 ) {
            return res.status(404).send(`This user doesn't exists`);
        }

        way = rows;
    } catch ( err ) {
        console.log('deu ruim')
        return res.status(500).send(err.message);
    }

    res.locals.params = way;

    next()
}