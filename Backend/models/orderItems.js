const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Orders = require('./order');

const OrderItems = sequelize.define('OrderItems',{
    orderItemsId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false,
    },
    orderId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: 'orderId'
              }
    },
    itemTitle:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    itemQty:{
        type: DataTypes.NUMBER,
        allowNull:false,
    },
    itemPrice:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    }
})


module.exports = OrderItems;