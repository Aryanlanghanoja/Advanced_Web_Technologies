const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
  const attributes = {
    student_name: { type: DataTypes.STRING, allowNull: false },
    student_email: { type: DataTypes.STRING, allowNull: true },
    student_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };
  return sequelize.define("student", attributes);
}
