const express = require('express');
const router = express.Router();
const review = require('../controllers/reviewController');

router.post('/add-review/:productId/:userId/:orderId', review.createReview);
router.get('/all', review.getAll);
router.delete('/:reviewId', review.deleteReview);

module.exports = router;
