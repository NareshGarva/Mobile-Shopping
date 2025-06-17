const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const recentlyViewed = sequelize.define('recentlyViewed', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  viewedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

module.exports = recentlyViewed;
