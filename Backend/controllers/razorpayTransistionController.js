const razorpay = require('../config/razorpay');
const { Order } = require("../models/initAssociations");
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const crypto = require("crypto");
const sendMail = require('../utils/mailer'); // nodemailer for sending emails

exports.capturePayment = async (req, res) => {
  try {
    console.log("Function call", req.body);
    const { orderId, paymentMethod, orderAmount } = req.body;


    if (!orderId || !orderAmount || !paymentMethod) {
      return res.status(400).json({ message: 'Invalid data provided.' });
    }

    // Fetch the order from DB
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Now create Razorpay order if paymentMethod is Online (or Razorpay)
    if (paymentMethod === 'Online') {
      console.log("if block initiated");

      const options = {
        amount: Math.round(orderAmount * 100), // in paise
        currency: 'INR',
        receipt: `order_rcptid_${orderId}`,
        payment_capture: 1,
      };

      console.log("options data: ", options);

      const razorpayOrder = await razorpay.orders.create(options);
console.log("order created :", razorpayOrder);
      if (!razorpayOrder) {
        return res.status(500).json({ message: 'Failed to create Razorpay order.' });
      }

      // Save the Razorpay order ID in DB
      order.razorpayOrderId = razorpayOrder.id;
      await order.save();

      // Respond to frontend with order info
      return res.status(200).json({
        success: true,
        message: 'Order created successfully.',
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        key: process.env.MY_RAZORPAY_KEY_ID
      });
    } else {
      return res.status(400).json({ message: 'Payment method is not supported.' });
    }

  } catch (error) {
    console.error("Error in capturePayment:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};





// Signature verification function
function verifySignature(order_id, payment_id, signature, secret) {
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(order_id + "|" + payment_id)
    .digest("hex");
  return generated_signature === signature;
}




exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = process.env.MY_RAZORPAY_SECRET_KEY;

  try {
    // Step 1: Verify the signature
    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      secret
    );

    if (!isValid) {
      return res.status(400).json({ isValid: false, message: "Invalid signature" });
    }

    // Step 2 (Recommended): Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.status === 'captured' &&
      payment.order_id === razorpay_order_id
      // Optional: check payment.amount === yourExpectedAmount
    ) {
      return res.status(200).json({ isValid: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ isValid: false, message: "Payment not captured or mismatched order" });
    }

  } catch (err) {
    return res.status(400).json({ isValid: false, message: err.message });
  }
};

