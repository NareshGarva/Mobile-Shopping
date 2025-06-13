const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponCodesController');

// Create a new coupon
router.post('/add/coupons', couponController.createCoupon);

// Apply a coupon to an order
router.post('/apply', couponController.applyCoupon);

// Get all coupons
router.get('/get-all/coupons', couponController.getAllCoupons);

// update a specific coupon by code
router.put('/update/coupons', couponController.updateCoupon);

// delete coupon by id
router.delete('/coupons/delete/:id', couponController.deleteCoupon);

module.exports = router;
