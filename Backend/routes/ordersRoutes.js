const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const razorpayTransistionController = require('../controllers/razorpayTransistionController');

// Create a new order
router.post('/create-Order', orderController.createOrder);

// Create a new order
router.post('/capture-payment',razorpayTransistionController.capturePayment );

// Get all orders
router.get('/get-All-Order', orderController.getAllOrders);

// Get a single order by ID
router.get('/:id', orderController.getOrderById);

// Get a single order by ID
router.put('/update_order/:orderId', orderController.updateOrderDetails);

// Update order status
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;
