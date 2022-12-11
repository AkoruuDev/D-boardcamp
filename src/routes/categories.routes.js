import { Router } from "express";
import { getCategories, postCategory } from "../controllers/categories.controller.js";
import { categoriesValidate } from "../middlewares/categoriesValidate.js";

const categories = Router();

categories.get('/categories', getCategories);
categories.post('/categories', categoriesValidate, postCategory);

export default categories;