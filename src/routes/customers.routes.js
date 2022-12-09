import { Router } from "express";
import { getCustomer, getCustomers, postCustomer, updateCustomer } from "../controllers/customers.controller";

const customers = Router();

customers.get('/customers', getCustomers);
customers.post('/customers', postCustomer);

customers.get('/customers/:id', getCustomer);
customers.put('/customers/:id', updateCustomer);

export default customers;