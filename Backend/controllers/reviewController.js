const Review = require('../models/productReview');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { userId, orderId, productId } = req.params;
        const { name, rating, comment } = req.body;

        const review = await Review.create({
            productId,
            userId,
            orderId,
            name,
            rating,
            comment,
            date: new Date()  
        });

        res.status(200).json(review);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to create review', details: error.message });
    }
};

// Get all reviews
exports.getAll = async (req, res) => {
    try {
        const reviews = await Review.findAll();

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        
        res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
};

// Get all reviews for a product
exports.getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.findAll({ where: { productId } });

        if (!reviews.length) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
};





// Delete a review by review ID
exports.deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const deleted = await Review.destroy({ where: { reviewId } });

        if (!deleted) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review', details: error.message });
    }
};
