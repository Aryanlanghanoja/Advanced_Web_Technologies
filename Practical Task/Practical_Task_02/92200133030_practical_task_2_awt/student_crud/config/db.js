const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('awt_student', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;