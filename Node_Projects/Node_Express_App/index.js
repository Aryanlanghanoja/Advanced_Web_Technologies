const express = require("express");
const router = express.Router();
const app = express();
const port = 3000;
app.use(express.json());
const cb0 = function (req, res, next) {
  console.log(Date.now());
  next();
};

app.post(
  "/example/d",
  cb0,
  (req, res, next) => {
    //ensure the inputs are numbers
    if (isNaN(req.body.num1) || isNaN(req.body.num2))
      res.send("Please enter valid numbers");
    else next();
  },
  (req, res , next) => {
    //ensure the second number is non zero
    if (req.body.num2 == 0)
      res.send("Please enter second number as non zero value");
    else next();
  },
  (req, res) => {
    //response for all arithmatic results
    res.send({
      num1: req.body.num1,
      num2: req.body.num2,
      add: req.body.num1 + req.body.num2,
      sub: req.body.num1 - req.body.num2,
      mul: req.body.num1 * req.body.num2,
      div: req.body.num1 / req.body.num2,
      mod: req.body.num1 % req.body.num2,
    });
  }
);
app.listen(port, () => console.log(`http://localhost:${port}/`));
