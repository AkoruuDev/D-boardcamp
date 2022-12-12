import { connection } from "../../database/database.js";

export async function postRentalValidate ( req, res, next ) {
    const { customerId, gameId, daysRented } = req.body;

    const date = new Date();
    const rentDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const {rows} = await connection.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
    const originalPrice = Number(daysRented) * Number(rows[0].pricePerDay);
    const returnDate = null
    const delayFee = null

    const customer = await connection.query(`SELECT * FROM customer WHERE id = $1;`, [customerId]);
    if ( customer.rows.length === 0 ) {
        return res.status(400).send(`Customer selected doesn't exists`);
    };

    const game = await connection.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
    if ( game.rows.length === 0 ) {
        return res.status(400).send(`Games selected doesn't exists`);
    };

    if ( daysRented <= 0 ) {
        return res.status(400).send(`Days rented must be more than 0`);
    };

    const stock = Number(game.rows[0].stockTotal);
    const rentalQty = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [gameId]);
    const availableGame = stock > Number(rentalQty.rows.length);
    if (!availableGame) {
        return res.status(400).send(`Isn't there games availables`);
    }

    res.locals.body = { customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee };
    next();
};