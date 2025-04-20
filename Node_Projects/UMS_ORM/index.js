require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

// Database Connection
const  dbConfig = require("./config/db.config");
const db = require("./helpers/db.helper");

// Routes
const webRouter = require("./routes/web.routes");
const userRouter = require("./routes/user.routes");
const leadRouter = require("./routes/leads.routes");
const followupRouter = require("./routes/followup.routes");
const taskRouter = require("./routes/tasks.routes");
const documentRouter = require("./routes/documents.routes");

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
app.use("/", webRouter);
app.use("/api/user", userRouter);
app.use("/api/lead", leadRouter);
app.use("/api/followup", followupRouter);
app.use("/api/task", taskRouter);
app.use("/api/document", documentRouter);

// Start the server
app.get('/', (req, res) => {
    res.send('Welcome to the Trackly Lead Management API!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});