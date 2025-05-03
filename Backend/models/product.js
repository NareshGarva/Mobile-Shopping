const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,      
        primaryKey: true
    },
    productTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    sellingPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    warranty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainImage: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = Product;
