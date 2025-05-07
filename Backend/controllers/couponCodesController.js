const Coupon = require('../models/couponCodes');

// Create a new coupon
exports.createCoupon = async (req, res) => {
    try {
        const { code, type, value, minOrderAmount, expiresAt } = req.body;

        if (!code || !type || !value) {
            return res.status(400).json({ message: 'Code, type, and value are required.' });
        }

        const existing = await Coupon.findOne({ where: { code } });
        if (existing) {
            return res.status(400).json({ message: 'Coupon code already exists.' });
        }

        const newCoupon = await Coupon.create({
            code,
            type,
            value,
            minOrderAmount,
            expiresAt
        });

        res.status(201).json({ message: 'Coupon created successfully.', coupon: newCoupon });
    } catch (error) {
        console.error('Error creating coupon:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Apply a coupon (validate and calculate discount)
exports.applyCoupon = async (req, res) => {
    try {
        const { code, orderAmount } = req.body;

        if (!code || !orderAmount) {
            return res.status(400).json({ message: 'Coupon code and order amount are required.' });
        }

        const coupon = await Coupon.findOne({ where: { code, isActive: true } });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid or inactive coupon.' });
        }

        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
            return res.status(400).json({ message: 'Coupon has expired.' });
        }

        if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
            return res.status(400).json({ message: `Minimum order amount is Rs.${coupon.minOrderAmount}` });
        }

        let discount = 0;
        if (coupon.type === 'percentage') {
            discount = (orderAmount * parseFloat(coupon.value)) / 100;
        } else if (coupon.type === 'fixed') {
            discount = parseFloat(coupon.value);
        }

        res.status(200).json({
            message: 'Coupon applied successfully.',
            discount: discount.toFixed(2),
            finalAmount: (orderAmount - discount).toFixed(2)
        });
    } catch (error) {
        console.error('Error applying coupon:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// List all coupons
exports.getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.status(200).json(coupons);
    } catch (error) {
        console.error('Error fetching coupons:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Deactivate a coupon
exports.deactivateCoupon = async (req, res) => {
    try {
        const { code } = req.params;

        const coupon = await Coupon.findOne({ where: { code } });
        if (!coupon) {
            return res.status(404).json({ message: 'Coupon not found.' });
        }

        coupon.isActive = false;
        await coupon.save();

        res.status(200).json({ message: 'Coupon deactivated successfully.' });
    } catch (error) {
        console.error('Error deactivating coupon:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
