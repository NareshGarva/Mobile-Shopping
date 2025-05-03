const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/', reviewController.createReview);

// Get all reviews for a product by productId
router.get('/:productId', reviewController.getReviewsByProductId);

// Update a review by review ID
router.put('/:id', reviewController.updateReview);

// Delete a review by review ID
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
