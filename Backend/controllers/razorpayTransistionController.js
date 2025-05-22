const razorpay = require('../config/razorpay');
const { Order } = require("../models/initAssociations");
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const crypto = require("crypto");
const {sendMail} = require('../utils/mailer'); // nodemailer for sending emails

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
  const { email,orderId,razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = process.env.MY_RAZORPAY_SECRET_KEY;

  console.log("verification process start");
  try {
    // Step 1: Verify the signature
    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      secret
    );

    console.log("process complete");
    if (!isValid) {
      console.log("not valid");
      return res.status(400).json({ isValid: false, message: "Invalid signature" });
    }

    // Step 2 (Recommended): Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.status === 'captured' &&
      payment.order_id === razorpay_order_id
    ) {

console.log("getting in mail");

       const mailResult = sendMail(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .container {
      max-width: 500px;
      margin: 80px auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h1 {
      color: #28a745;
    }
    p {
      font-size: 16px;
      margin: 15px 0;
    }
    .order-id {
      font-weight: bold;
      color: #333;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #001f55;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: #004aad;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎉 Thank You for Your Order!</h1>
    <p>Your order has been successfully placed.</p>
    <p class="order-id">Order ID: ${orderId}</p>
    <p>You will receive a confirmation email shortly.</p>
    <a href="index.html" class="btn">Continue Shopping</a>
  </div>
</body>
</html>
`,
      "Order Payment Recived!",
      email
    );

console.log("getting out from mail")
      return res.status(200).json({ isValid: true, message: "Payment verified successfully" });
    } else {
         const mailResult = sendMail(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Failed</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #fff5f5;
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .container {
      max-width: 500px;
      margin: 80px auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    h1 {
      color: #dc3545;
    }
    p {
      font-size: 16px;
      margin: 15px 0;
      color: #333;
    }
    .order-id {
      font-weight: bold;
      color: #000;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #001f55;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: #004aad;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>⚠️ Verification Failed</h1>
    <p>We’re sorry! Your order could not be verified.</p>
    <p class="order-id">Order ID: ${orderId} (this order may not be reflect in your account.)</p>
    <p>Your payment was received successfully.</p>
    <p>A full refund will be processed within 5–7 working days.</p>
    <a href="support.html" class="btn">Contact Support</a>
  </div>
</body>
</html>

`,
      "Order Verification Failed!",
      email
    );
      return res.status(400).json({ isValid: false, message: "Payment not captured or mismatched order" });
    }

  } catch (err) {
    return res.status(400).json({ isValid: false, message: err.message });
  }
};

