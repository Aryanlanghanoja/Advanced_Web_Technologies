const fs = require('fs');
const pg = require('pg');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CA,
    },
};

const client = new pg.Client(config);

client.connect((err) => {
    if (err) {
        console.error('Connection error', err.stack);
        return;
    }
    console.log('Connected to PostgreSQL');

    // Fetch PostgreSQL version
    client.query("SELECT VERSION()", [], (err, result) => {
        if (err) {
            console.error('Error fetching version:', err.stack);
        } else {
            console.log('PostgreSQL Version:', result.rows[0].version);
        }
    });

    // List all tables in the current database
    client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        ORDER BY table_name;
    `, [], (err, result) => {
        if (err) {
            console.error('Error fetching tables:', err.stack);
        } else {
            console.log('Tables in the database:');
            result.rows.forEach(row => console.log('- ' + row.table_name));
        }
    });

    // Query to fetch all rows from the "test" table
    client.query("SELECT * FROM test", [], (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Rows from test table:');
            console.table(res.rows);
        }

        
        // End connection
        // client.end((err) => {
        //     if (err) {
        //         console.error('Error closing connection', err.stack);
        //     } else {
        //         console.log('Connection closed');
        //     }
        // });
    });

    client.query("DELETE FROM test WHERE id = 2", [], (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('ROW DELETED FROM test');
        }

        
        // End connection
        // client.end((err) => {
        //     if (err) {
        //         console.error('Error closing connection', err.stack);
        //     } else {
        //         console.log('Connection closed');
        //     }
        // });
    });

    client.query("SELECT * FROM test", [], (err, res) => {
        if (err) {
            console.error('Error executing query', err.stack);
        } else {
            console.log('Rows from test table:');
            // console.table(res.rows);
        }

        
        //End connection
        client.end((err) => {
            if (err) {
                console.error('Error closing connection', err.stack);
            } else {
                console.log('Connection closed');
            }
        });
    });
});
