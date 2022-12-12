import { connection } from "../../database/database.js";

export async function getGames ( req, res ) {
    const { name } = req.query;

    try{
        if ( name ) {
            const { rows } = await connection.query(`SELECT name.games, image.games, stockTotal.games, categoryId.games, pricePerDay.games, name.categories FROM games JOIN categories ON games.categoryId = categories.id WHERE POSITION ($1 IN games.name) = 1;`, [name]);

            return res.status(400).send(rows);
        } else {
            const { rows } = await connection.query(`SELECT name.games, image.games, stockTotal.games, categoryId.games, pricePerDay.games, name.categories FROM games JOIN categories ON games.categoryId = categories.id;`);

            return res.status(400).send(rows);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function postGame ( req, res ) {
    const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.body;
    
    try {
        await connection.query(`INSERT INTO games ( name, image, stockTotal, categoryId, pricePerDay ) VALUES ($1, $2, $3, $4, $5);`, [name, image, stockTotal, categoryId, pricePerDay]); // verify

        return res.status(201).send(`This game added successfully`);
    } catch ( error ) {
        return res.status(500).send(error.message);
    }
};