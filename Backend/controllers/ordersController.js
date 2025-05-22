
const {
  User,
  userAddress,
   shippingAddress,
   billingAddress,
  Order,
  OrderItems,
  OrderTimeline,
  OrderItemsVarient,
} = require("../models/initAssociations");
 











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
  where: { userId },
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
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  } = req.body;

  try {
    const order = await Order.findByPk(orderId);

    if (!order || order.orderStatus !== "Draft") {
      return res.status(404).json({ message: "Draft Order not found." });
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
