
const {
  User,
   userAddress,
  Order,
  OrderItems,
  OrderTimeline,
  OrderItemsVarient,
} = require("../models/initAssociations");




//    // Now create Razorpay order if paymentMethod is Online (or Razorpay)
//     let razorpayOrder = null;
//     if (paymentMethod === 'Online') {
//       const options = {
//         amount: Math.round(orderAmount * 100), // in paise
//         currency: 'INR',
//         receipt: `order_rcptid_${order.orderId}`,
//         payment_capture: 1,
//       };

//       razorpayOrder = await razorpay.orders.create(options);

//       // Save razorpayOrderId in your order record
//       order.razorpayOrderId = razorpayOrder.id;
//       await order.save();
//     }




// Create a new order
exports.createOrder = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'Please provide order details.' });
        }

        const { userId, orderAmount, paymentStatus, shippingStatus, shippingAddressId, billingAddressId, orderTrackingId, orderTransactionId, items } = req.body;
        console.log("the cart items: ",items);
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
        const orders = await Order.findAll();
       res.status(200).json({ message: "All orders list:", orders });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



//get all orders by user id 
exports.getAllOrdersByUserId = async (req, res) => {
    if(!userId){
        return res.status(400).json({message: 'Please provide user id.'});
    }

    try{
        const user = await User.findOne({where: {id: userId}});
        if(!user){
            return res.status(400).json({message: 'User not found.'});
        }

        const orders = await Order.findAll({where: {userId: userId}});

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
        const { id, status } = req.body;


        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        if (!['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid order status.' });
        }

        order.status = status;
        await order.save();

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
    orderTrackingId,
    orderTransactionId,
  } = req.body;

  try {
    const order = await Order.findByPk(orderId);

    if (!order || order.status !== "Draft") {
      return res.status(404).json({ message: "Draft Order not found." });
    }

    // Update fields only when the order is in Draft status
    await order.update({
      orderAmount,
      shippingAddressId,
      billingAddressId,
      orderStatus: orderStatus || "Processing",
      paymentMethod,
      paymentStatus,
      orderTrackingId,
      orderTransactionId,
    });

    // Add timeline entry
    await OrderTimeline.create({
      orderId: order.orderId,
      label: "Order Purchased",
      date: new Date(),
    });

    return res.status(200).json({
      message: "Order updated successfully.",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
