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
    database: "awt_lhc"
} , function(err) {
    if (err) {
        console.error("MySQL connection error:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});

app.get('/', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});

app.get('/leave', (req, res) => {
    const sql = "SELECT * FROM leave_type";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});

app.get('/designation', (req, res) => {
    const sql = "SELECT name FROM designation";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});

app.get('/reporting_head', (req, res) => {
    const dept = req.query.dept; 
    const sql = "SELECT name FROM reporting_head where department = ?";
    db.query(sql, [dept], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});

app.get('/department', (req, res) => {
    const sql = "SELECT name FROM department";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});


app.post('/employee', (req, res) => {
    const sql = "INSERT INTO employee (name, email, salary , designation , department  , reporting_head) VALUES (?, ?, ? , ? , ? , ?)";
    const values = [req.body.name, req.body.email, req.body.salary , req.body.designation , req.body.department , req.body.reporting_head ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: "Student added successfully", result });
    });

    if(req.body.designation == "Manager" || req.body.designation == "Senior Manager"){
        const sql = "INSERT INTO reporting_head (name, department) VALUES (?, ?)";
        const values = [req.body.name, req.body.department];
    }
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: "Student added successfully", result });
    });
});

app.get('/fetch_leave', (req, res) => {
    const sql = "SELECT * FROM leave_table";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});
// Fetch the report_head based on name

app.get('/fetch_report_head', (req, res) => {
    const sql = "SELECT * FROM leave_table WHERE name = ?";
    const name = req.query.name; // Assuming you're sending the name as a query parameter
    db.query(sql, name, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    })
});

app.get('/fetch_admin', (req, res) => {
    const sql = "SELECT is_admin FROM employee WHERE name = ?";
    const name = req.query.name; // Assuming you're sending the name as a query parameter
    db.query(sql, name, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    })
});

// i want to fetch the count of leaves of each types of leaves

// based on the name of the employee

// i want to fetch the count of leaves of each types of leaves
// based on the name of the employee write a query
app.get('/fetch_leave_count', (req, res) => {
    const name = req.query.name;
    const sql = "SELECT COUNT(leave_type) as count FROM leave_table WHERE name = ? GROUP BY leave_type";
    db.query(sql, name, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    })
});

//  Based on Salary taken in Employee creation , calculate the salary after deducting leaves without pay for given duration.

app.get('/fetch_salary', (req, res) => {
    const name = req.query.name;
    const sql = "SELECT salary FROM employee WHERE name = ?";
    db.query(sql, name, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    })
})

// Generate Departmentwise , employeewise leave report with approved and reject count for each typeof leave for given duration.

app.get('/fetch_leave_report', (req, res) => {
    const sql = "SELECT COUNT(leave_type) as count FROM leave_table WHERE name = ? GROUP BY leave_type";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    })
});

// Generate yearly salary and leave statistics report.

app.get('/fetch_yearly_report', (req, res) => {
    const sql = "SELECT COUNT(leave_type) as count FROM leave_table WHERE name = ? GROUP BY leave_type";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    })
});

// Fetch the count of leaves taken in this month.

app.get('/fetch_monthly_leave', (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const sql = `
        SELECT 
            emp_name,
            leave_type,
            SUM(CASE WHEN MONTH(date) = ? AND YEAR(date) = ? THEN 1 ELSE 0 END) AS month_count,
            SUM(CASE WHEN YEAR(date) = ? THEN 1 ELSE 0 END) AS year_count
        FROM leave_table
        GROUP BY emp_name, leave_type
    `;

    db.query(sql, [currentMonth, currentYear, currentYear], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }

        return res.json({
            month: currentMonth,
            year: currentYear,
            leave_summary: result
        });
    });
});

app.get('/fetch_user_leave', (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const sql = `
        SELECT 
            emp_name,
            SUM(CASE WHEN MONTH(date) = ? AND YEAR(date) = ? THEN 1 ELSE 0 END) AS month_count,
            SUM(CASE WHEN YEAR(date) = ? THEN 1 ELSE 0 END) AS year_count
        FROM leave_table
        GROUP BY emp_name
    `;  

    db.query(sql, [currentMonth, currentYear, currentYear], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }

        return res.json({
            month: currentMonth,
            year: currentYear,
            leave_summary: result
        });
    });
});

app.get('/fetch_left_leave', (req, res) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const sql = `
        SELECT 
            emp_name,
            leave_type,
            (
                SELECT allowed_month 
                FROM leave_type 
                WHERE name = leave_table.leave_type
            ) - 
            SUM(CASE 
                WHEN MONTH(date) = ? AND YEAR(date) = ?
                THEN 1 ELSE 0 
            END) AS pending_month_leave,

            (
                SELECT allowed_year
                FROM leave_type 
                WHERE name = leave_table.leave_type
            ) - 
            SUM(CASE 
                WHEN YEAR(date) = ? 
                THEN 1 ELSE 0 
            END) AS pending_year_leave

        FROM leave_table
        GROUP BY emp_name, leave_type
    `;

    db.query(sql, [currentMonth, currentYear, currentYear], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }

        return res.json({ pending_leave_summary: result });
    });
});

// to fetch the pending and approoved leave count in the current year
app.get('/fetch_emp_leave_count', (req, res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const sql = `SELECT emp_name , COUNT(*) FROM leave_table 
    WHERE YEAR(date) = ? AND status = 'approved' as approved_count, COUNT(*) FROM leave_table WHERE YEAR(date) = ? AND status = 'pending' as pending_count GROUP BY emp_name`;
    db.query(sql, [currentYear, currentYear], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }

        return res.json({ leave_count_summary: result });
    });
})


app.get('/fetch_dept_leave_count', (req, res) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const sql = `SELECT (SELECT name FROM department)as dept_name , COUNT(*) FROM leave_table WHERE YEAR(date) = ? AND status = 'approved' as approved_count, COUNT(*) FROM leave_table WHERE YEAR(date) = ? AND status = 'reject' as pending_count GROUP BY dept_name`;
    db.query(sql, [currentYear, currentYear], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Server error", error: err });
        }

        return res.json({ leave_count_summary: result });
    });
})




app.post('/leave', (req, res) => {
    const sql = "INSERT INTO leave_type (name, allowed_year, allowed_month , payment) VALUES (?, ?, ? , ?)";
    const values = [req.body.name, req.body.allowed_year, req.body.allowed_month , req.body.payment];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: err.message });
        }
        return res.json({ message: "Student added successfully", result });
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM employee WHERE id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json(result);
    });
});

app.get('/leave/read/:id', (req, res) => {
    const sql = "SELECT * FROM leave_type WHERE id=?";
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
    const sql = "UPDATE employee SET name=?, email=?, salary=? , designation = ?, department = ? , reporting_head = ?  WHERE id=?";
    const id = req.params.id;
    const { name, email, salary , designation , department , reporting_head } = req.body;

    db.query(sql, [name, email, salary , designation , department , reporting_head, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json({ message: "Student updated successfully" });
    });
});

app.post('/leave/update/:id', (req, res) => {
    const sql = "UPDATE leave_type SET name=?, allowed_year=?, allowed_month=? , payment = ?  WHERE id=?";
    const id = req.params.id;
    const { name, allowed_year, allowed_month , payment } = req.body;

    db.query(sql, [name, allowed_year, allowed_month , payment, id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error inside server", error: err });
        }
        return res.json({ message: "Student updated successfully" });
    });
});

app.post('/leave/delete/:id', (req, res) => {
    const sql = "DELETE FROM leave_type WHERE id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).json({ message: "Error deleting student", error: err });
        }
        return res.json({ message: "Student deleted successfully", result });
    });
});

app.post('/delete/:id', (req, res) => {
    const sql = "DELETE FROM employee WHERE id=?";
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