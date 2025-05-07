const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponCodesController');

// Create a new coupon
router.post('/coupons', couponController.createCoupon);

// Apply a coupon to an order
router.post('/coupons/apply', couponController.applyCoupon);

// Get all coupons
router.get('/coupons', couponController.getAllCoupons);

// Deactivate a specific coupon by code
router.patch('/coupons/deactivate/:code', couponController.deactivateCoupon);

module.exports = router;
