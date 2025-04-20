const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const markRoutes = require('./src/marks/marks.routes');
const db = require('./src/config/db.config');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/students', markRoutes);

app.get('/', (req, res) => {
  res.send('Student Result Management System API');
});

app.listen(PORT, () => {
  console.log(`Server running at  http://localhost:${PORT}`);
});
