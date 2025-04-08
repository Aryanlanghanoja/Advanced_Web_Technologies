require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

// Database and Routes
const sequelize = require('./config/db');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Product API!');
  });
  

// DB sync and start server
sequelize.sync().then(() => {
    console.log('MySQL synced  and Connected Sucessfully');
    app.listen(process.env.PORT, () => {
        console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to DB:', err);
});
