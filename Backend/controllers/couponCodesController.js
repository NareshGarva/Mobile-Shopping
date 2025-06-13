const { where } = require('sequelize');
const Coupon = require('../models/coupons');

// Create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { couponCode, couponType, couponStatus, expiry,discountValue } = req.body;

    if (!couponCode || !couponType || !discountValue) {
      return res.status(400).json({ message: 'Code, discount type, and value are required.' });
    }

    const existing = await Coupon.findOne({ where: {code: couponCode } });
    if (existing) {
      return res.status(400).json({ message: 'Coupon code already exists.' });
    }

    console.log("content varyfied");

    const newCoupon = await Coupon.create({
      code:couponCode,
      expiry,
      discountType:couponType,
      discountValue,
      status:couponStatus
    });

   return res.status(200).json({ message: 'Coupon created successfully.' });
    
  } catch (error) {
    console.error('Error creating coupon:', error);
   return res.status(500).json({ message: 'Internal server error.' });
  }
};



// Apply a coupon
exports.applyCoupon = async (req, res) => {
  try {
    const { couponCode, orderAmount } = req.body;

    if (!couponCode || !orderAmount) {
      return res.status(400).json({ message: 'Coupon code and order amount are required.' });
    }

    const coupon = await Coupon.findOne({ where: { code:couponCode, status: 'Active' } });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or inactive coupon.' });
    }

    if (coupon.expiry && new Date(coupon.expiry) < new Date()) {
      return res.status(400).json({ message: 'Coupon has expired.' });
    }

    let discount = 0;
    if (coupon.discountType === 'Percentage') {
      discount = (orderAmount * parseFloat(coupon.discountValue)) / 100;
    } else if (coupon.discountType === 'Fixed') {
      discount = parseFloat(coupon.discountValue);
    }

    const finalAmount = orderAmount - discount;
    res.status(200).json({
      message: 'Coupon applied successfully.',
      discount: discount.toFixed(2),
      finalAmount: finalAmount > 0 ? finalAmount.toFixed(2) : '0.00'
    });

  } catch (error) {
    console.error('Error applying coupon:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.status(200).json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Update a coupon using Sequelize
exports.updateCoupon = async (req, res) => {
  try {

    const { couponCode, couponType, couponStatus, expiry, discountValue } = req.body;

    if (!couponCode || !couponType || !discountValue) {
      return res.status(400).json({ message: 'Code, discount type, and value are required.' });
    }

    const coupon = await Coupon.findOne({ where: { code: couponCode } });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found.' });
    }

    // Perform update
    const updatedRows = await Coupon.update(
      {
        expiry,
        discountType: couponType,
        discountValue,
        status: couponStatus
      },
      {
        where: { code: couponCode }
      }
    );

    if (updatedRows === 0) {
      return res.status(400).json({ message: 'No changes were made.' });
    }

    res.status(200).json({ message: 'Coupon updated successfully.' });
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Delete coupon by ID
exports.deleteCoupon = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Coupon.destroy({
      where: { couponId: id }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Coupon not found.' });
    }

    res.status(200).json({ message: 'Coupon deleted successfully.' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
