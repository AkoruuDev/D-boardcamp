import { connection } from "../../database/database.js";

export async function getRentals ( req, res ) {
    const promise = await connection.query(`SELECT *.rentals FROM rentals JOIN customer JOIN game ON (id.rentals == id.customer), (id.rentals == id.game)`);

    return res.status(201).send(promise);
};

export async function postRentals ( req, res ) {
    const { customerId, gameId, daysRented } = req.body;

    const rentDate = '' // dayjs. data atual
    const originalPrice = daysRented // * game.price // preço original do jogo
    // const returnDate = null
    // const delayFee = null

    const customerExists = await connection.query(`SELECT * FROM customer WHERE id = $1;`, [customerId]);
    if ( !customerExists ) {
        return res.status(400).send(`Customer selected doesn't exists`);
    };

    const gameExists = await connection.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
    if ( !gameExists ) {
        return res.status(400).send(`Games selected doesn't exists`);
    };

    if ( daysRented <= 0 ) {
        return res.status(400).send(`Days rented must be more than 0`);
    };

    const availableGame = await connection.query(`;`);
    if (!availableGame) {
        return res.status(400).send(`Isn't there games availables`);
    }

    return res.status(201).send(`Customer created successfully`);
};

export async function finishRental ( req, res ) {
    const { id } = req.params;

    const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
    if ( !rental ) {
        return res.status(404).send(`Rental not found`);
    }
    if ( rental.returnDate !== null ) {
        return res.status(400).send(`This rental already finished`);
    }

    const dateReturn = new Date();
    const dalayFee = '' // (dateReturn - rental.rentDate) * (rental.originalPrice / rental.daysRented);
    await connection.query(`UPDATE rentals SET returnDate = $1 WHERE id = $2;`, [dateReturn, id]);

    return res.status(200).send(`Rental finished successfully`);
};

export async function deleteRental ( req, res ) {
    const { id } = req.params;

    const rental = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
    if (!rental) {
        return res.status(404).send(`Rental not found`);
    }
    if ( rental.returnDate !== null ) {
        return res.status(400).send(`Rental must be finished before to delete`);
    }

    await connection.query(`DELETE FROM rentals WHERE id = $1;`, [id]);

    return res.status(200).send(`Rental deleted successfully`);
}