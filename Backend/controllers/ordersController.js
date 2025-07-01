
const { where } = require("sequelize");
const {
  User,
  userAddress,
   shippingAddress,
   billingAddress,
  Order,
  OrderItems,
  OrderTimeline,
  OrderItemsVarient,
  Product
} = require("../models/initAssociations");
const {sendMail} = require('../utils/mailer'); // nodemailer for sending emails 




// Create a new order
exports.createOrder = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Please provide order details.' });
        }

        const { userId, orderAmount, paymentStatus, shippingStatus, shippingAddressId, billingAddressId, orderTrackingId, orderTransactionId, items } = req.body;
       
        // 📝 **No need for JSON.parse here**
        if (!Array.isArray(items)) {
            return res.status(400).json({ message: 'Items should be an array.' });
        }
     

        // Create order
        const order = await Order.create({
            userId,
            orderAmount,
            paymentMethod: 'Online'
        });

        if (!order) {
            return res.status(500).json({ message: 'Order creation failed.' });
        }

for (const item of items) {
  console.log(item.cartVarients)
    const orderItem = await OrderItems.create({
        orderId: order.orderId,
        minImage: item.Product.mainImage,
        itemTitle: item.Product.productTitle,
        itemQty: item.quantity,
        itemPrice: item.Product.sellingPrice,
        itemColor: item.color,
    });

    // Now loop through the variants of each item and insert
    if (item.cartVarients && Array.isArray(item.cartVarients)) {
        for (const varient of item.cartVarients) {
            await OrderItemsVarient.create({
                orderItemId: orderItem.orderItemId,
                type: varient.type,
                value: varient.value,
            });
        }
    }
}

        

        // Insert order timeline
        await OrderTimeline.create({
            orderId: order.orderId,
            label: 'Order Created',
            date: new Date(),
        });

        console.log('Order created successfully.', order);
        return res.status(201).json({ message: 'Order created successfully.', order });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({include: [{
      model: OrderItems,
      include: [OrderItemsVarient]
    },
    {
      model: OrderTimeline
    },
      {
      model: billingAddress
    },
      {
      model: shippingAddress
    }]});
       res.status(200).json({ message: "All orders list:", orders });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



//get all orders by user id 
exports.getAllOrdersByUserId = async (req, res) => {
    // Get the ID from request params
        const { userId } = req.params;
    console.log("user Id : ", userId)
    if(!userId){
        return res.status(400).json({message: 'Please provide user id.'});
    }

    try{
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            return res.status(400).json({message: 'User not found.'});
        }
const orders = await Order.findAll({
  where: { userId},
  include: [
    {
      model: OrderItems,
      include: [OrderItemsVarient]
    },
    {
      model: OrderTimeline
    },
      {
      model: billingAddress
    },
      {
      model: shippingAddress
    }
  ]
});



        if(!orders){
            return res.status(400).json({message: 'No orders found.'});
        }

        return res.status(200).json({ message: 'Orders found', orders });

    }catch(error){
        console.log("Error in fetching orders :", error);
        return res.status(500).json({message: 'Internal server error'});
    }
}


// Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        // Get the ID from request params
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Id not provided' });
        }

        // Fetch the order with associated models
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderItems,
                    include: [
                        {
                            model: OrderItemsVarient
                        }
                    ]
                },
                {
                    model: OrderTimeline
                }
            ]
        });

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Respond with the found order
        res.status(200).json({ message: 'Order found', order });

    } catch (error) {
        console.error('Error fetching order:', error.message);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        let { orderId, shippingStatus, trackId,paymentStatus,orderStatus } = req.body;
        const order = await Order.findByPk(orderId);
              const orderItemData = await OrderItems.findAll({where: { orderId: orderId }});

  
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        
    // Create timeline entry
    await OrderTimeline.create({
      orderId: orderId,
      label: shippingStatus || paymentStatus || orderStatus,
      date: new Date(),
    });
    
        if(( shippingStatus || paymentStatus || orderStatus )=== "Cancelled"){
         
          for (const item of orderItemData) {
  const product = await Product.findOne({ where: { productTitle: item.itemTitle } });

  if (product) {
    const updatedStock = product.stock + item.itemQty;

    await Product.update(
      { stock: updatedStock },
      { where: { productTitle: item.itemTitle } }
    );
  }
}


paymentStatus = shippingStatus = orderStatus = "Cancelled";
        }

        if(shippingStatus=== "Delivered"){
orderStatus = "Complete";
paymentStatus = "Paid";
        }

        if(shippingStatus=== "Returned"){

       for (const item of orderItemData) {
  const product = await Product.findOne({ where: { productTitle: item.itemTitle } });

  if (product) {
    const updatedStock = product.stock + item.itemQty;

    await Product.update(
      { stock: updatedStock },
      { where: { productTitle: item.itemTitle } }
    );
  }
}


orderStatus = "Complete";
paymentStatus = "Refunded";
        }
       
        await order.update({
          shippingStatus,
          trackId: trackId,
          orderStatus,
          paymentStatus
        });

        const user = await User.findByPk(order.userId);
      
     const mailResult = sendMail(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Order Status Update</title>
  <style>
    /* Fallback styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    table {
      border-collapse: collapse;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
    .button {
      background-color: #FED700;
      color: #001F55;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      font-weight: bold;
    }
  </style>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin: 40px auto; padding: 20px; border-radius: 8px;">
          <tr>
            <td align="center" style="padding: 20px 0;">
            ${shippingStatus === "Processing"? `<!-- Order Processing Email -->
<h1 style="color: #FFA500;">Your Order is Being Processed 🛠️</h1>
<p>Hello ${user.name},</p>
<p>Your order <strong>#${orderId}</strong> is currently being processed. We're getting everything ready for you.</p>
<p style="color: #FFA500; font-weight: bold;">Status: Processing</p>
<a href="http://127.0.0.1:5500/Frontend/User%20Module/pages/account.html" style="background-color: #FFA500; color: #fff; padding: 10px 20px; text-decoration: none;">View Order</a>
` : shippingStatus === "Shipped" ? `<!-- Order Shipped Email -->
<h1 style="color: #1E90FF;">Your Order Has Been Shipped 🚚</h1>
<p>Hello ${user.name},</p>
<p>Great news! Your order <strong>#${orderId}</strong> has been shipped and is on its way to you.</p>
<p style="color: #1E90FF; font-weight: bold;">Status: Shipped</p>
<a href="http://sampleTrack.com/track-order/${trackId}" style="background-color: #1E90FF; color: #fff; padding: 10px 20px; text-decoration: none;">Track Shipment</a>
` : shippingStatus === "Delivered" ? `<!-- Order Delivered Email -->
<h1 style="color: #28a745;">Your Order Has Been Delivered 📦</h1>
<p>Hello ${user.name},</p>
<p>We’re happy to inform you that your order <strong>#${orderId}</strong> has been successfully delivered.</p>
<p style="color: #28a745; font-weight: bold;">Status: Delivered</p>
<a href="http://127.0.0.1:5500/Frontend/User%20Module/pages/post%20review.html" style="background-color: #28a745; color: #fff; padding: 10px 20px; text-decoration: none;">Give Feedback</a>
` : shippingStatus === "Returned" ? `<!-- Order Returned Email -->
<h1 style="color: #800080;">Your Order Has Been Returned 🔁</h1>
<p>Hello ${user.name},</p>
<p>Your order <strong>#${orderId}</strong> has been returned. If you have questions or want to reorder, we’re here to help.</p>
<p>Our shipping partner will pickup the order as soon as, and your refund will be reflected in your account.</p>
<p style="color: #800080; font-weight: bold;">Status: Returned</p>
` : `<!-- Order Cancelled Email -->
<h1 style="color: #DC3545;">Your Order Has Been Cancelled ❌</h1>
<p>Hello ${user.name},</p>
<p>We're sorry to inform you that your order <strong>#${orderId}</strong> has been cancelled. If this was a mistake or you have questions, please reach out to us.</p>
<p style="color: #DC3545; font-weight: bold;">Status: Cancelled</p>
`}
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 0; text-align: center; font-size: 12px; color: #888888;">
              If you have any questions, feel free to <a href="mailto:support@example.com" style="color: #001F55;">contact our support team</a>.
              <br><br>
              © 2025 Your Company Name, All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>

`,
      shippingStatus === "Processing" ? "🛠️ Your Order is Being Processed" :
 shippingStatus === "Shipped" ? "🚚 Your Order is On the Way!" :
 shippingStatus === "Delivered" ? "📦 Your Order Has Been Delivered!" :
 shippingStatus === "Returned" ? "🔁 Your Order Has Been Returned" : "❌ Your Order Has Been Cancelled",
      user.email
    );

        res.status(200).json({ message: 'Order status updated successfully.', order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};




exports.updateOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  const {
    orderAmount,
    shippingAddressId,
    billingAddressId,
    orderStatus,
    paymentMethod,
    paymentStatus,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  } = req.body;

  try {
    const order = await Order.findByPk(orderId);
      const orderItemData = await OrderItems.findAll({where: { orderId: orderId }});


    if (!order || order.orderStatus !== "Draft") {
      return res.status(404).json({ message: "Draft Order not found." });
    }


for (const item of orderItemData) {
  const product = await Product.findOne({ where: { productTitle: item.itemTitle } });

  if (product) {
    const updatedStock = product.stock - item.itemQty;

    await Product.update(
      { stock: updatedStock },
      { where: { productTitle: item.itemTitle } }
    );
  }
}


    // Update order
    await order.update({
      orderAmount,
      orderStatus: orderStatus || "Processing",
      paymentMethod,
      paymentStatus,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    // Fetch shipping address from user's saved addresses
    const shippingAddressData = await userAddress.findOne({
      where: { addressId: shippingAddressId },
    });

    if (!shippingAddressData) {
      return res.status(404).json({ message: "Shipping address not found." });
    }

    const {
      addressType,
      fullName,
      addressLine1,
      localityArea,
      cityTown,
      state,
      pinCode,
      country,
      mobileNumber,
    } = shippingAddressData;

    // Create shipping address entry
    await shippingAddress.create({
      orderId,
      addressType,
      fullName,
      addressLine1,
      localityArea,
      cityTown,
      state,
      pinCode,
      country,
      mobileNumber,
    });

    // Handle billing address
    if (shippingAddressId === billingAddressId) {
      // If both are same, copy shipping data
      await billingAddress.create({
        orderId,
        addressType,
        fullName,
        addressLine1,
        localityArea,
        cityTown,
        state,
        pinCode,
        country,
        mobileNumber,
      });
    } else {
      const billingAddressData = await userAddress.findOne({
        where: { addressId: billingAddressId },
      });

      if (!billingAddressData) {
        return res.status(404).json({ message: "Billing address not found." });
      }

      const {
        addressType: billingType,
        fullName: billingName,
        addressLine1: billingLine1,
        localityArea: billingLocality,
        cityTown: billingCity,
        state: billingState,
        pinCode: billingPin,
        country: billingCountry,
        mobileNumber: billingMobile,
      } = billingAddressData;

      await billingAddress.create({
        orderId,
        addressType: billingType,
        fullName: billingName,
        addressLine1: billingLine1,
        localityArea: billingLocality,
        cityTown: billingCity,
        state: billingState,
        pinCode: billingPin,
        country: billingCountry,
        mobileNumber: billingMobile,
      });
    }

    // Create timeline entry
    await OrderTimeline.create({
      orderId: orderId,
      label: "Order Purchased",
      date: new Date(),
    });

    return res.status(200).json({
      message: "Order updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};



exports.authOrder = async (req, res) => {
  const { productTitle, userId } = req.params;

  if (!productTitle || !userId) {
    return res.status(400).json({ message: 'Product title or user ID not provided' });
  }
  try {
    const isauth = await Order.findOne({
      where: { userId, shippingStatus: 'Delivered'},
      include: [{
        model: OrderItems,
        where: { itemTitle: productTitle }
      }]
    });

    if (!isauth) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order found", data: isauth });
  } catch (error) {
    console.log("this is the error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
