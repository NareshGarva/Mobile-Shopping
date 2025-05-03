const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductColor = sequelize.define('ProductColor', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    colorValue: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = ProductColor;
