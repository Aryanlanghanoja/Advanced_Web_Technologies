const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConfig = require("./src/config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Sucessfully Connected to the Database");
  })
  .catch((err) => {
    console.log("Error in Database connection ", err);
    process.exit();
  });

const blogRouter = require("./src/blog/blog.routes");

app.use("/api/blogs", blogRouter);

app.get("/", (req, res) => res.send("Welcome to the API of AWT Experiment - 6 API"));
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
