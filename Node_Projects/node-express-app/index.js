const express = require("express");
const errors = require("./src/utils/errors");
const staff = require("./src/routes/staff.routes");
const student = require("./src/routes/student.routes");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors.errorHandler);
app.use("/staff", staff);
app.use("/student", student);
app.listen(port, () => console.log(`http://localhost:${port}/`));
//17,13,18 present
