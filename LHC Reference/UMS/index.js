require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const db = require("./config/dbConnection");
const userRouter = require("./routes/userRoutes");
const webRouter = require("./routes/webRoutes");

// Middleware
app.set('view engine', 'ejs');
app.use(express.json())
app.use('/api', userRouter)
app.use('/', webRouter)
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        message: err.message,
    });
});

// Routes
app.get("/", (req, res) => res.send("Hello World!"));

// Start server
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
