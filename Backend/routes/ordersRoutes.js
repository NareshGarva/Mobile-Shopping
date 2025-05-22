const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const razorpayTransistionController = require('../controllers/razorpayTransistionController');
const generateInvoice =  require('../controllers/getInvoice');


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

// Get a single order by ID
router.get('/get-All-Order/:userId', orderController.getAllOrdersByUserId);

// Update order status
router.patch('/:id/status', orderController.updateOrderStatus);

router.post('/verify-payment', razorpayTransistionController.verifyPayment);
router.get('/:orderId/invoice', generateInvoice.getInvoice);

module.exports = router;
 