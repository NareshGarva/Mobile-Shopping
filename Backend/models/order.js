const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const userAddress = require('./userAddress');

const Orders = sequelize.define("Orders", {
    orderId: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    primaryKey: true,    
},

    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: User,
            key: 'userId'
        }
    },
    orderStatus:{
type: DataTypes.STRING.ENUM('Draft', 'Complete', 'Cancelled'),
allowNull: false
    },
    orderDate:{
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    orderAmount:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
    },
    paymentStatus: {
        type: DataTypes.STRING.ENUM('Pending', 'Paid','Cancelled','Refunded'),
        allowNull: false,
        defaultValue: 'Panding',
    },
    shippingStatus:{
        type: DataTypes.STRING.ENUM('Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'),
        allowNull: false,
        defaultValue: 'Processing',
    },
    paymentMethod:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Cash on Delivery',
    },
    shippingAdressId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: userAddress,
            key: 'addressId',
        }
    },
    billingAddressId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: userAddress,
            key: 'addressId',
        }
    },
    orderTrackingId:{
        type: DataTypes.STRING,
        allowNull: false,

    },
    orderTransactionId:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Orders