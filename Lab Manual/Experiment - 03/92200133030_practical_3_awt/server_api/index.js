const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const blogRoutes = require('./src/blogs/blogs.routes');
const db = require('./src/config/db.config');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.send('Blog Management System API');
});

app.listen(PORT, () => {
  console.log(`Server running at  http://localhost:${PORT}`);
});
