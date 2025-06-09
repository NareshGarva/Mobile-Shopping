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
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isFutureDate(value) {
        if (value && new Date(value) <= new Date()) {
          throw new Error('Expiry date must be in the future.');
        }
      }
    }
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
