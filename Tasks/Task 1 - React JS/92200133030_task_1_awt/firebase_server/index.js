import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

const PORT = 3000;
const app = express();
import bookRoutes from "./src/routes/book.routes.js";


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/books", bookRoutes);

try {
    const db = await import("./src/config/firebase_connection.js");
    console.log("Connected to Firebase Successfully");
} catch (error) {
    console.log("Error connecting to Firebase");
    console.log(error.message)
}

app.get("/", (req, res) => {
    res.send("Welcome to Firebase CRUD Operation API!");
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});
