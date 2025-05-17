const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.MY_RAZORPAY_KEY_ID,// key_id
    key_secret: process.env.MY_RAZORPAY_SECRET_KEY // key_secret
});

module.exports = razorpay;