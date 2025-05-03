const DataTypes = require('sequelize');
const sequelize = require('../config/db');

const PasswordReset = sequelize.define('PasswordReset', {
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    tokenExpiry:{
        type:DataTypes.DATE,
        allowNull:false,
    }

})

module.exports = PasswordReset;

