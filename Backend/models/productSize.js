const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductSize = sequelize.define('ProductSize', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    timestamps: false
});

module.exports = ProductSize;
