const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const UserAddress = require('./userAddress'); // Changed to PascalCase

const Order = sequelize.define("Order", {
    orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    orderStatus: {
        type: DataTypes.ENUM('Draft', 'Complete', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Draft',
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    orderAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    paymentStatus: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Cancelled', 'Refunded'),
        allowNull: false,
        defaultValue: 'Pending',
    },
    shippingStatus: {
        type: DataTypes.ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'),
        allowNull: false,
        defaultValue: 'Processing',
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Cash on Delivery',
    },
    shippingAddressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: UserAddress,  // Changed to PascalCase
            key: 'addressId',
        }
    },
    billingAddressId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: UserAddress,  // Changed to PascalCase
            key: 'addressId',
        }
    },
razorpayOrderId: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: null,
},
razorpayPaymentId: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: null,
},

}, {
    tableName: 'orders', // Optional: if you want the table name to be lowercase
    timestamps: true, // Adds createdAt and updatedAt
});

module.exports = Order;
