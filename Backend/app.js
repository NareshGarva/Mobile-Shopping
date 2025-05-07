const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const authanticationRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const customerRoutes = require('./routes/customerRoutes');

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
