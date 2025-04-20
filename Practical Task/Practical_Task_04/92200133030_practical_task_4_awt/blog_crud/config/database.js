const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('awt_blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
