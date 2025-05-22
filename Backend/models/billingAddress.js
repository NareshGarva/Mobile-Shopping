const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./order');

const billingAddress = sequelize.define('billingAddress', {
  addressId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'orderId'
    }
  },
  addressType: {
    type: DataTypes.ENUM('Home', 'Work', 'Parents', 'Other'),
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  localityArea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cityTown: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pinCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.BIGINT,   
    allowNull: false,
  }
});

module.exports = billingAddress;
