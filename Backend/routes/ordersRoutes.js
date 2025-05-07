const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');

// Create a new order
router.post('/orders', orderController.createOrder);

// Get all orders
router.get('/orders', orderController.getAllOrders);

// Get a single order by ID
router.get('/orders/:id', orderController.getOrderById);

// Update order status
router.patch('/orders/:id/status', orderController.updateOrderStatus);

module.exports = router;
