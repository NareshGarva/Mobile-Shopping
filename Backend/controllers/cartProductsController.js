const CartProduct = require('../models/cartProducts');
const Product = require('../models/Product');

// Add a product to the cart
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID and Product ID are required.' });
        }

        // Check if product is already in cart
        const existingItem = await CartProduct.findOne({
            where: { userId, productId }
        });

        if (existingItem) {
            existingItem.quantity += quantity || 1;
            await existingItem.save();
        } else {
            await CartProduct.create({
                userId,
                productId,
                quantity: quantity || 1
            });
        }

        res.status(200).json({ message: 'Product added to cart.' });
    } catch (error) {
        console.error('Error in addToCart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all cart items for a user
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        const cartItems = await CartProduct.findAll({
            where: { userId },
            include: [
                {
                    model: Product,
                    attributes: ['id', 'name', 'mainImageUrl', 'sellingPrice']
                }
            ]
        });

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error in getCartItems:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({ message: 'User ID and Product ID are required.' });
        }

        await CartProduct.destroy({
            where: { userId, productId }
        });

        res.status(200).json({ message: 'Product removed from cart.' });
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Optional: Clear entire cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' });
        }

        await CartProduct.destroy({
            where: { userId }
        });

        res.status(200).json({ message: 'Cart cleared.' });
    } catch (error) {
        console.error('Error in clearCart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
