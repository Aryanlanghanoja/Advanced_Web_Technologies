const fs = require('fs');
const pg = require('pg');

const config = {
    user: "",
    password: "",
    host: "",
    port: ,
    database: "",
    ssl: {
        rejectUnauthorized: true,
        ca: 
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
