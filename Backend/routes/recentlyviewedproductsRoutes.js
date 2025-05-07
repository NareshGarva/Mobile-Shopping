const express = require('express');
const router = express.Router();
const recentlyViewedController = require('../controllers/recentlyViewedProductsController');

// Route to add a recently viewed product
router.post('/recently-viewed', recentlyViewedController.addRecentlyViewed);

// Route to get recently viewed products for a specific user
router.get('/recently-viewed/:userId', recentlyViewedController.getRecentlyViewed);

module.exports = router;
// This code defines the routes for recently viewed products. It includes a POST route to add a recently viewed product and a GET route to retrieve recently viewed products for a specific user. The routes are handled by the `recentlyViewedController` which contains the logic for adding and fetching recently viewed products.
// The routes are exported as a module to be used in the main application file.