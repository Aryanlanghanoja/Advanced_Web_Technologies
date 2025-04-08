const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const logs = (req, res, next) => {
  console.log(Date.now());
  next();
};
app.post(
  "/",
  logs,
  (req, res, next) => {
    //validate numbers
    if (isNaN(req.body.num1) || isNaN(req.body.num2))
      res.send("Enter valid numbers");
    else next();
  },
  (req, res, next) => {
    //Second num must be non zero
    if (req.body.num2 == 0) res.send("Enter second number as non zero");
    else next();
  },
  (req, res) => {
    //generate result
    res.json({
      num1: req.body.num1,
      num2: req.body.num2,
      add: req.body.num1 + req.body.num2,
      sub: req.body.num1 - req.body.num2,
    });
  }
);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
