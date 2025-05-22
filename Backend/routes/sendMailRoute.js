const express = require('express');
const router = express.Router();
const {sendMailRoute} = require('../utils/mailer');

// Route to add a recently viewed product
router.post('/send-mail',sendMailRoute);

module.exports = router;