const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const orderItem = require('./orderItems');

const orderItemVarient = sequelize.define('orderItemVarient', {
    orderVarientId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    orderItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: orderItem,
            key: 'orderItemId'
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = orderItemVarient;
