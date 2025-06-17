const express = require('express');
const router = express.Router();
const recentlyViewedProductsController = require('../controllers/recentlyViewedProductsController');

// Create a new recently viewed porduct
router.post('/add/:userId/:productId', recentlyViewedProductsController.addRecentlyViewed);

// get all porducts by user
router.get('/get-by-user/:userId', recentlyViewedProductsController.getRecentlyViewedByUser);

// get all porducts
// router.get('/get-all', recentlyViewedProductsController.getRecentlyViewedByUser);


module.exports = router;
