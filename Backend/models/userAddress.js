const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const userAddress = sequelize.define('userAddress', {
  addressId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  defaultAddress: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
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
    type: DataTypes.BIGINT,   // Changed to BIGINT to store large mobile numbers
    allowNull: false,
  }
});

module.exports = userAddress;
