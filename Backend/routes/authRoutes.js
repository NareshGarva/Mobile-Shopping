const express = require('express');
const router = express.Router();
const { login, register, getProfile,getAdminProfile, adminLogin,forgotPassword,resetPassword } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/login-user', login);
router.post('/register-user', register);
router.get('/profile', authenticateToken, getProfile); // Protected route

router.post('/forgot-password', forgotPassword); // Password reset route
router.post('/reset-password', resetPassword); // Password reset route

router.post('/admin-login', adminLogin);
router.get('/deshboard', authenticateToken, getAdminProfile); // Protected route
module.exports = router;
