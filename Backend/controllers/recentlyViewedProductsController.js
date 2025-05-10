const RecentlyViewedProduct = require('../models/recentlyViewedProducts');
const Product = require('../models/product');

// Add a recently viewed product
exports.addRecentlyViewed = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID and Product ID are required.' });
        }

        // Check if this product has already been viewed by the user
        const existing = await RecentlyViewedProduct.findOne({
            where: { userId, productId }
        });

        if (existing) {
            // Update timestamp if already exists
            existing.viewedAt = new Date();
            await existing.save();
        } else {
            await RecentlyViewedProduct.create({ userId, productId });
        }

        res.status(200).json({ message: 'Product marked as recently viewed.' });
    } catch (error) {
        console.error('Error in addRecentlyViewed:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all recently viewed products for a user (e.g., last 10)
exports.getRecentlyViewed = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const viewedProducts = await RecentlyViewedProduct.findAll({
            where: { userId },
            order: [['viewedAt', 'DESC']],
            limit: 10,
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'mainImageUrl', 'sellingPrice']
                }
            ]
        });

        res.status(200).json(viewedProducts);
    } catch (error) {
        console.error('Error in getRecentlyViewed:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
