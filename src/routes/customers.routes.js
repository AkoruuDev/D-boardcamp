import { Router } from "express";
import {
    getCustomer, getCustomers, postCustomer, updateCustomer
} from "../controllers/customers.controller.js";
import { customersValidate } from "../middlewares/customersValidate.js";
import { customerValidate } from "../middlewares/customerValidate.js";

const customers = Router();

customers.get('/customers', getCustomers);
customers.post('/customers', customersValidate, postCustomer);

customers.get('/customers/:id', customerValidate, getCustomer);
customers.put('/customers/:id', customersValidate, updateCustomer);

export default customers;