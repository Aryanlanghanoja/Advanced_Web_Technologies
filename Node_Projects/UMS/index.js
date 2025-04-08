require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Database connection
const db = require("./config/dbConnection");

// Routes
const userRouter = require("./routes/userRoutes");
const webRouter = require("./routes/webRoutes");

// Set view engine and public directory
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route middlewares
app.use("/api", userRouter);
app.use("/", webRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        message: err.message,
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
