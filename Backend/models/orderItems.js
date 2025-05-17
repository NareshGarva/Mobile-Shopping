const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order'); // Corrected from Orders to Order


const OrderItem = sequelize.define('OrderItem', {
    orderItemId: {  // Changed to PascalCase
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order, // Corrected from Orders to Order
            key: 'orderId'
        }
    },
    minImage:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemQty: {
        type: DataTypes.INTEGER, // Corrected Data Type
        allowNull: false,
    },
    itemPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    itemColor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}, {
    tableName: 'orderItems',
    timestamps: true,
});

module.exports = OrderItem;
