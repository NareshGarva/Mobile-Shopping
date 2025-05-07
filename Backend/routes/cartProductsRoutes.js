const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartProductsController');

// Add to cart
router.post('/cart', cartController.addToCart);

// Get all cart items for a user
router.get('/cart/:userId', cartController.getCartItems);

// Remove a specific product from cart
router.delete('/cart', cartController.removeFromCart);

// Clear the entire cart for a user
router.delete('/cart/clear/:userId', cartController.clearCart);

module.exports = router;
