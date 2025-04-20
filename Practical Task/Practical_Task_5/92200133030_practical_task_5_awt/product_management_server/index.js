const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const db = require("./models");
const cors = require("cors")

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use("/api/products", productRoutes);

const PORT = 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
});