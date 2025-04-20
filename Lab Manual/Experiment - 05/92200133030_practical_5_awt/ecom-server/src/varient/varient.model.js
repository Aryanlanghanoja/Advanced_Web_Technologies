const DataTypes = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        varient_name: { type: DataTypes.STRING, allowNull: false },
        varient_description: { type: DataTypes.STRING, allowNull: true },
        varient_status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    };
    return sequelize.define("varient", attributes);
}
