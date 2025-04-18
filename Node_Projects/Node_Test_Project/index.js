// var a = 20 ;
// let b = 30 ;
// const c = 40 ;
// console.log(a + " + " +  b  + " = " + (a+b)); // String Concadination
// console.log(`${a} + ${b} = ${a + b}`); // String Interpolation

const express = require('express');
const app = express();
const port = 3000 ;

app.get('/', (req, res) => res.send("Hello World From Aryan Langhanoja!"));
app.get('/api', (req, res) => res.send("API By Aryan Langhanoja!"));
app.get('/api1', (req, res) => res.send("API By Aryan Langhanoja! Next Version"));
app.get("/university", (req, res) => res.send("MU"));
app.get("/university/faculty", (req, res) => res.send("Faculty of Technology"));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// app.listen(port, () => console.log(`Server is running on port ${port}`));
