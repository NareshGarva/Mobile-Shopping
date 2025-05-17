const razorpay = require('../config/razorpay');
const { Order, OrderTimeline } = require("../models/initAssociations");

exports.capturePayment = async (req, res) => {
  try {
    console.log("Function call");
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
