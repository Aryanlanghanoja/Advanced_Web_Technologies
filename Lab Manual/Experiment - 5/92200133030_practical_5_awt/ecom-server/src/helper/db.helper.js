//for config
const { MYSQL_DB_CONFIG } = require("../config/db.config");

//for mysql connection
const mysql = require("mysql2/promise");

//for Sequelize ORM
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
    const { HOST, USER, PORT, PASSWORD, DB } = MYSQL_DB_CONFIG;

    const connection = await mysql.createConnection({
        host: HOST,
        port: PORT,
        user: USER,
        password: PASSWORD,
    });

    await connection.query(`Create database if not exists \`${DB}\`;`);

    //connect to db
    const sequelize = new Sequelize(DB, USER, PASSWORD, {
        dialect: "mysql",
        host: HOST,
    });

    db.Category = require("../category/category.model")(
        sequelize
    );

    db.Product = require("../product/product.model")(
        sequelize
    );

    db.Varient = require("../varient/varient.model")(
        sequelize
    );

    // Define associations after all models have been defined
    db.Category.hasMany(db.Product);
    db.Product.belongsTo(db.Category);

    db.Product.hasMany(db.Varient);
    db.Varient.belongsTo(db.Product);

    await sequelize.sync({ alter: false });
}
