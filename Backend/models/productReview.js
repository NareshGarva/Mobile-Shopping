const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./product');
const User = require('./user');
const Order = require('./order');

const Review = sequelize.define('Review', {
    reviewId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
   userId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = Review;
