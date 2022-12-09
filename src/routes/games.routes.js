import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controller.js";

const games = Router();

games.get('/games', getGames);
games.post('/games', postGame);

export default games;