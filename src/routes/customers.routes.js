import { Router } from "express";

const customers = Router();

customers.get('/customers', () => {});
customers.post('/customers', () => {});

customers.get('/customers/:id', () => {});
customers.put('/customers/:id', () => {});

export default customers;