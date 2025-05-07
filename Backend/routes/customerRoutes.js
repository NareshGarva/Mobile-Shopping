const express = require('express');
const router = express.Router();
const customerControllers = require('../controllers/customerControllers');

// Get all customers
router.get('/all', customerControllers.getAllCustomers);

// Delete a customer by ID
router.delete('/:id', customerControllers.deleteCustomer);

module.exports = router;
