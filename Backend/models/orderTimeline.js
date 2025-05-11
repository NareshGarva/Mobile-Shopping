const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Orders = require('./order');

const OrderTimeline = sequelize.define('OrderTimeline',{
    orderTimelineId:{
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
    label:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Date:{
        type: DataTypes.DATE,
        allowNull:false,
        defaultValue: DataTypes.NOW,
    }
})


module.exports = OrderTimeline;