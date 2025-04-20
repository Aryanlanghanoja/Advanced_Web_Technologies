const express = require('express');
const app = express();
const sequelize = require('./config/db');
require('./models'); // Load models and associations

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');

app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB error:', err));

const PORT =  3000;

app.get("/" , (req , res) => {
    res.send("Welcome To Student CRUD Operation API")
})
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
