const Review = require('../models/review');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { productId, name, rating, comment, date } = req.body;

        const review = await Review.create({
            productId,
            name,
            rating,
            comment,
            date: date || new Date()  // fallback to current date
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review', details: error.message });
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

// Update a review by review ID
exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, rating, comment, date } = req.body;

        const [updatedRowsCount] = await Review.update(
            { name, rating, comment, date },
            { where: { id } }
        );

        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Review not found or nothing to update' });
        }

        res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review', details: error.message });
    }
};

// Delete a review by review ID
exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Review.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review', details: error.message });
    }
};
