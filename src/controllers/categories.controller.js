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
    const { name } = req.body;

    if (name === undefined || name === "") {
        return res.status(400).send(`Categoy doesn't defined`);
    }

    const search = await connection.query(`SELECT * FROM categories WHERE name = $1;`, [name]);

    if ( search.rows.length != 0 ) {
        return res.status(409).send(`this category already exists`);
    }

    await connection.query(`INSERT INTO categories ( name ) VALUES ($1);`, [name]);

    res.status(200).send(`Category added successfully`);
};