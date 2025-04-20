const DataTypes = require('sequelize');

module.exports = model;

function model(sequelize) {
    const { INTEGER, BOOLEAN, STRING, TEXT } = DataTypes;
    const attributes = {
        product_name: { type: STRING, allowNull: false },
        product_description: { type: TEXT, allowNull: true },
        price: { type: INTEGER, allowNull: false },
        categoryId: { type: INTEGER, allowNull: false },
        product_status: { type: BOOLEAN, allowNull: false, defaultValue: true },
    };
    return sequelize.define("product", attributes);
}