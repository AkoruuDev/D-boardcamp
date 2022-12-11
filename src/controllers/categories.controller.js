import { connection } from "../../database/database.js";

export async function getCategories ( req, res ) {
    try {
        const { rows } = await connection.query(`SELECT * FROM categories;`);

        return res.status(200).send(rows);
    } catch ( err ) {
        return res.status(500).send(err.message);
    }
};

export async function postCategory ( req, res ) {
    const name = req.body;

    try {
        await connection.query(`INSERT INTO categories ( name ) VALUES ($1);`, [name]);

        return res.status(200).send(`Category added successfully`);
    } catch ( err ) {
        return res.status(500).send(err.message);
    }
};