const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blog.routes');
const logger = require('./middlewares/logger');          // Logger middleware
const errorHandler = require('./middlewares/errorHandler');  // Error handler middleware
const sequelize = require('./config/database');
const Blog = require('./models/blog.model');
const app = express();

app.use(bodyParser.json());
app.use(logger);

// Routes
app.use('/api/blogs', blogRoutes);

app.use(errorHandler); 

const PORT = 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('DB Connection Failed:', err);
});
