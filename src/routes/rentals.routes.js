import { Router } from "express";
import { deleteRental, finishRental, getRentals, postRentals } from "../controllers/rentals.controller.js";
import { postRentalValidate } from "../middlewares/rentalsValidate.js";

const rentals = Router();

rentals.get('/rentals', getRentals);
rentals.post('/rentals', postRentalValidate, postRentals);

rentals.post('/rentals/:id/return', finishRental);

rentals.delete('/rentals/:id', deleteRental);

export default rentals;