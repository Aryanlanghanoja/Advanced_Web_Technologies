// 5. utils/database.js (DB init and connect)
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('awt_pos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;