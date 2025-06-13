const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Coupon = sequelize.define('Coupon', {
  couponId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expiry: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  discountType: {
    type: DataTypes.ENUM('Fixed', 'Percentage'), 
    defaultValue: 'Fixed',
  },
  discountValue: {
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  }
}, {
  tableName: 'coupons',
  timestamps: true
});

module.exports = Coupon;
