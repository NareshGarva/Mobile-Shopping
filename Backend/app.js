const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const authanticationRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userAddressRoutes = require('./routes/userAddressRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const sendMailRoute = require('./routes/sendMailRoute');
const reviewRoute = require('./routes/reviewRoute');
const couponRoute = require('./routes/couponCodesRoutes');
const recentlyViewedRoute = require('./routes/recentlyViewedRoutes');


// Apply middleware BEFORE routes
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json())

// Authantication  routes
app.use('/api/auth', authanticationRoutes);


// Product  routes
app.use('/api/product', productRoutes);


// category  routes
app.use('/api/category', categoryRoutes);


// customer  routes
app.use('/api/customer', customerRoutes);

// cart  routes
app.use('/api/cart', cartRoutes);

// address  routes
app.use('/api/address', userAddressRoutes);

// orders  routes
app.use('/api/order', orderRoutes);

// email  routes
app.use('/api/email', sendMailRoute);

// review  routes
app.use('/api/review', reviewRoute);

// coupon  routes
app.use('/api/coupon', couponRoute);

// coupon  routes
app.use('/api/recently-viewed', recentlyViewedRoute);




// Default route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Sync DB & Start server
const sequelize = require('./config/db');
sequelize.sync();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
