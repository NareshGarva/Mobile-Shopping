const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const cartProducts = require('./cartProducts');

const cartVarient = sequelize.define('cartVarient', {
    cartVarientId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: cartProducts,
            key: 'cartId'
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

module.exports = cartVarient;
