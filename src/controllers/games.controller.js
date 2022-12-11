import { connection } from "../../database/database.js";

export async function getGames ( req, res ) {
    const list = await connection.query(`SELECT * FROM games`);

    return res.send(list);
};

export async function postGame ( req, res ) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    /* name: Joi
            .string()
            .request()
            .min(1),
    stockTotal: Joi
            .number()
            .request()
            .value(> 0),
    pricePerDay: Joi
            .number()
            .request()
            .value(> 0) 
    
    return 400        */

    const check = await connection.query(`SELECT * FROM games WHERE id = $1` [categoryId]);

    if(!check) {
        return res.status(400).send(`This categoryId doesn't exists`);
    }

    const verifyName = await connection.query(`SELECT ( name ) FROM games WHERE name = $1`, [name]);

    if (verifyName) {
        return res.status(409).send(`This game name already exists`);
    };

    return res.status(201).send(`This game added successfully`);
};