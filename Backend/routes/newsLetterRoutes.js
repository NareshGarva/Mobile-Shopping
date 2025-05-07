const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsLetterController');

// Subscribe to newsletter
router.post('/newsletter/subscribe', newsletterController.subscribe);

// Unsubscribe from newsletter
router.post('/newsletter/unsubscribe', newsletterController.unsubscribe);

// Get all current subscribers
router.get('/newsletter/subscribers', newsletterController.getAllSubscribers);

module.exports = router;
