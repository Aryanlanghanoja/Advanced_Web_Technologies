import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json())
const db = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "mu_2425_test"
} , function(err) {
    if (err) {
        console.error("MySQL connection error:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO students (name, age, grade) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.age, req.body.grade];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: "Student added successfully", result });
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});

app.post('/update/:id', (req, res) => {
    const sql = "UPDATE students SET name=?, age=?, grade=? WHERE id=?";
    const id = req.params.id;
    const { name, age, grade } = req.body;

    db.query(sql, [name, age, grade, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json({ message: "Student updated successfully" });
    });
});

app.post('/delete/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).json({ message: "Error deleting student", error: err });
        }
        return res.json({ message: "Student deleted successfully", result });
    });
});

app.listen(8081, () => {
    console.log("Listening");
})