import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categories.controller.js";

const categories = Router();

categories.get('/categories', getCategories);
categories.post('/categories', postCategory);

export default categories;