const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("awt_product", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Product = require("./productModel")(sequelize, DataTypes);

module.exports = db;