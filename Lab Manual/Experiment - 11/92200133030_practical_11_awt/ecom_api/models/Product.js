const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tags: {
        type: DataTypes.STRING, // comma separated string (e.g., "tech,electronics")
    }
},{
    timestamps: false
  });

module.exports = Product;
