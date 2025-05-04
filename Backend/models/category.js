const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const category = sequelize.define("Category", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    categoryName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    categoryStatus:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }

});

module.exports = category;