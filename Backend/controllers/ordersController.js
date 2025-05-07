const Order = require('../models/orders');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, paymentMethod, shippingAddress } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items are required and must be an array.' });
        }

        if (!totalAmount || !paymentMethod || !shippingAddress) {
            return res.status(400).json({ message: 'Total amount, payment method, and shipping address are required.' });
        }

        const newOrder = await Order.create({
            userId,
            items,
            totalAmount,
            paymentMethod,
            shippingAddress
        });

        res.status(201).json({ message: 'Order created successfully.', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.body;
        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.body;
        const { status } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid order status.' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated successfully.', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
