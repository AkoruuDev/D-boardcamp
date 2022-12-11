import { connection } from "../../database/database.js";

export async function getCategories ( req, res ) {
    const list = await connection.query(`SELECT * FROM categories;`);

    return res.send(list);
};

export async function postCategory ( req, res ) {
    const { name } = req.body;

    if (name === undefined || name === "") {
        return res.status(400).send(`Categoy doesn't defined`);
    }

    const search = await connection.query(`SELECT category FROM categories;`);

    if ( search ) {
        return res.status(409).send(`this category already exists`);
    }

    await connection.query(`INSERT INTO categories ( name ) VALUES ($1);`, [name]);

    res.status(200).send(`Category added successfully`);
};