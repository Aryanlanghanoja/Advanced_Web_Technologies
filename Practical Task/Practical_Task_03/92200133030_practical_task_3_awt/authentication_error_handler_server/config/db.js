const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  "awt_user",
  "root",
  "" ,
  {
    host: "localhost",
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
