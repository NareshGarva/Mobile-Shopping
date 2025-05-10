const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user')
const Product = require('./product')

const CartProduct = sequelize.define('CartProduct', {
    cartId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:User,
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    color:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:null
    }
}, {
    timestamps: true
});

module.exports = CartProduct;