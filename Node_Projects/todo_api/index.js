const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Read file using async method
app.get('/read', async (req, res) => {
    await fs.readFile('data.json', "utf-8" ,  (err, data) => {
        if (err) {
            throw err ;
        }

        console.log(JSON.parse(data))
    });

    console.log("After File Called");
    res.send("File Read");
});
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/student', (req, res) => res.send("Student Called"));
app.get('/staff', (req, res) => res.send("Staff Called"));
app.get('/university', (req, res) => res.send("University Called"));
app.get('/food', (req, res) => res.send("Food Called!"));
app.get('/b*k', (req, res) => res.send("B to K Called!"));
app.get('/google', (req, res) => res.send(`Google Called`));

// Corrected wildcard route for paths ending in "ful"
app.get(/.*ful$/, (req, res) => res.send("Wildcard *ful Called!"));

// Catch-all route for undefined APIs
app.get('*', (req, res) => res.send("No API available"));

// Start the server
app.listen(port, () => console.log(` server started on http://localhost:${port} !`));
