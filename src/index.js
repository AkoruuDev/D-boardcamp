import express from "express";
import dotenv from "dotenv";
import { connection } from "../database/database.js"

dotenv.config();
const app = express();
app.use(express.json());

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});