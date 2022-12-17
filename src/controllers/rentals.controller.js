import { connection } from "../../database/database.js";

export async function getRentals ( req, res ) {
    const { customerId } = req.query;
    const { gameId } = req.query;

    try {
        if (customerId) {
            const { rows } = await connection.query(`SELECT rentals."customerId", rentals."gameId", rentals."daysRented", rentals."rentDate", rentals."originalPrice", rentals."returnDate", rentals."delayFee", customers.id, customers.name, game.id, game.name, game."categoryId", game."categoryName" FROM rentals JOIN customers JOIN game ON (rentals."customerId" = customers.id), (rentals."gameId" = games.id) WHERE rentals."customerId" = $1;`, [customerId]);
    
            return res.status(201).send(rows);
        } else if (gameId) {
            const { rows } = await connection.query(`SELECT rentals."customerId", rentals."gameId", rentals."daysRented", rentals."rentDate", rentals."originalPrice", rentals."returnDate", rentals."delayFee", customers.id, customers.name, game.id, game.name, game."categoryId", game."categoryName" FROM rentals JOIN customers JOIN game ON (rentals."customerId" = customers.id), (rentals."gameId" = games.id) WHERE rentals."gameId" = $1;`, [gameId]);
    
            return res.status(201).send(rows);
        } else {
            const { rows } = await connection.query(`SELECT rentals."customerId", rentals."gameId", rentals."daysRented", rentals."rentDate", rentals."originalPrice", rentals."returnDate", rentals."delayFee", customers.id, customers.name, game.id, game.name, game."categoryId", game."categoryName" FROM rentals JOIN customers JOIN game ON (rentals."customerId" = customers.id), (rentals."gameId" = games.id);`);
    
            return res.status(201).send(rows);
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

export async function postRentals ( req, res ) {
    const { customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee } = res.locals.body;

    try {
        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`, [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]);

        return res.status(201).send(`Customer created successfully`);
    } catch ( error ) {
        return res.status(500).send(error.message);
    }
};

export async function finishRental ( req, res ) {
    const { id } = req.params;

    const date = new Date();
    const returnDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
    if ( rental.rows.length === 0 ) {
        return res.status(404).send(`Rental not found`);
    }
    if ( rental.rows[0].returnDate !== null ) {
        return res.status(400).send(`This rental already finished`);
    }

    const delayFee = (returnDate - rental.rows[0].rentDate) * (rental.rows[0].originalPrice / rental.rows[0].daysRented);
    await connection.query(`UPDATE rentals SET returnDate = $1, "delayFee" = $2 WHERE id = $3;`, [returnDate, delayFee, id]);

    return res.status(200).send(`Rental finished successfully`);
};

export async function deleteRental ( req, res ) {
    const { id } = req.params;

    const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
    if ( rental.rows.length === 0 ) {
        return res.status(404).send(`Rental not found`);
    }
    if ( rental.rows[0].returnDate !== null ) {
        return res.status(400).send(`Rental must be finished before to delete`);
    }

    await connection.query(`DELETE FROM rentals WHERE id = $1;`, [id]);

    return res.status(200).send(`Rental deleted successfully`);
}