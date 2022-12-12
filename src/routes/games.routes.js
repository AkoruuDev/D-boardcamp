import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controller.js";
import { gameValidate } from "../middlewares/gamesValidate.js";

const games = Router();

games.get('/games', getGames);
games.post('/games', gameValidate, postGame);

export default games;