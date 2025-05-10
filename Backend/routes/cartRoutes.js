const express = require('express');
const router = express.Router();
const { addToCart, getCartProducts, deleteCartProduct,updateCartQuantity } = require('../controllers/cartController');

router.post('/add-to-cart', addToCart);
router.delete('/:id', deleteCartProduct);
router.get('/get-cart-products', getCartProducts); // Protected route
router.patch('/update-quantity', updateCartQuantity);

module.exports = router;
