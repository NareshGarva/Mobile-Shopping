const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProductSpecification = sequelize.define('ProductSpecification', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    specKey: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specValue: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = ProductSpecification;
