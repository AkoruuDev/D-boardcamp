import express from "express";
import dotenv from "dotenv";

import categories from "./routes/categories.routes.js";
import customers from "./routes/customers.routes.js";
import games from "./routes/games.routes.js";
import rentals from "./routes/rentals.routes.js";

dotenv.config();
const server = express();
server.use(express.json());
const port = process.env.PORT;

// routes
server.use(categories);
server.use(customers);
server.use(games);
server.use(rentals);

server.listen(port || 5000, () => {
    console.log(`Server running on port ${port}`);
});