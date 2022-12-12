import { connection } from "../../database/database.js";
import { gameSchema } from "../tools/gamesSchema.js";

export async function gameValidate ( req, res, next ) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const { error } = gameSchema.validate({ name, stockTotal, pricePerDay });
    if ( error ) {
        return res.status(422).send(error.details.map(err => err.message));
    }

    const id = await connection.query(`SELECT name FROM categories WHERE id = $1;`, [categoryId]);
    if ( id.rows.length === 0 ) {
        return res.status(400).send(`CategoryId doesn't exists`);
    }

    const game = await connection.query(`SELECT * FROM games WHERE name = $1;`, [name]);
    // console.log(game.rows)
    if ( game.rows.length !== 0 ) {
        return res.status(409).send(`This game is already registered`);
    }

    res.locals.body = { name, image, stockTotal, categoryId, pricePerDay };
    next();
};