const {recentlyViewed, Product,productReviews} = require('../models/initAssociations');


// Add a recently viewed product
exports.addRecentlyViewed = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        console.log("init");
        if (!userId || !productId) {
console.log("both id's inner : ",userId,productId);
            return res.status(400).json({ message: 'User ID and Product ID are required.' });
        }
console.log("both id's : ",userId,productId);

        // Check if this product has already been viewed by the user
        const existing = await recentlyViewed.findOne({
            where: { userId, productId }
        });
console.log("check is done");
        if (existing) {
            // Update timestamp if already exists
            existing.viewedAt = new Date();
            await existing.save();
        } else {
            await recentlyViewed.create({ userId, productId });
        }
console.log("added")
        res.status(200).json({ message: 'Product marked as recently viewed.' });
    } catch (error) {
        console.error('Error in addRecentlyViewed:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all recently viewed products for a user (e.g., last 10)
exports.getRecentlyViewedByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const viewedProducts = await recentlyViewed.findAll({
            where: { userId },
            order: [['viewedAt', 'DESC']],
            limit: 10,
            include: [
                {
                    model: Product,
                    include: [
                        productReviews
                    ]
                }
            ]
        });

        res.status(200).json(viewedProducts);
    } catch (error) {
        console.error('Error in getRecentlyViewed:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
