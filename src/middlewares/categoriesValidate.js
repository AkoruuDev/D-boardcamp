import { connection } from "../../database/database.js";
import { categoriesSchema } from "../tools/categoriesSchema.js";

export async function categoriesValidate ( req, res, next) {
    const { name } = req.body;

    const { error } = categoriesSchema.validate({ name });
    if ( error ) {
        return res.status(422).send(error.details.map(e => e.message));
    };

    const search = await connection.query(`SELECT * FROM categories WHERE name = $1;`, [name]);
    if ( search.rows.length != 0 ) {
        return res.status(409).send(`this category already exists`);
    }

    res.locals.body = name;
    next();
}