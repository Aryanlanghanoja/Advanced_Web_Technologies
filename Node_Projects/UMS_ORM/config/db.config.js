const { Client } = require('pg');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DB_CA } = process.env;

const config = {
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: DB_CA,
    },
};

const connection = new Client(config);

connection.connect(err => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Connected to Database Sucessfully!');
    }
});

module.exports = connection;
