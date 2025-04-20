const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

// Sync database
sequelize.sync()
  .then(() => console.log('DB Synced'))
  .catch(err => console.log('DB Sync Error: ', err));

const PORT = 3000;

app.get("/" , (req,res) => {
    res.send("User Authentication API")
})

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});