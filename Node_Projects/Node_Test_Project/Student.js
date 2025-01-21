var students = [
  {
    id: 1,
    name: "Jay",
    city: "Rajkot",
    age: 14,
  },
  {
    id: 2,
    name: "Jay",
    city: "Rajkot",
    age: 14,
  },
  {
    id: 3,
    name: "Vijay",
    city: "Morbi",
    age: 10,
  },
  {
    id: 4,
    name: "Ajay",
    city: "Rajkot",
    age: 12,
  },
  {
    id: 5,
    name: "Raj",
    city: "Jamnagar",
    age: 12,
  },
];

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.json(students));
app.get("/student/:id", (req, res) => {
  var stud_id = req.params.id;
  var student = students.filter((s) => s.id == stud_id);
  res.json(student);
});

app.get("/student/city/:city", (req, res) => {
  var stud_city = req.params.city;
  var student = students.filter((s) => s.city == stud_city);

  if(student.length == 0) {
    res.json({message: "No student found in this city"});
  }

  res.json(student);
});

app.get("/student/age/:age", (req, res) => {
  var stud_age = req.params.age;
  var student = students.filter((s) => s.age >= stud_age);

  if(student.length == 0) {
    res.json({message:`No Student Found Elder then ${stud_age}`});
  }
  res.json(student);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
