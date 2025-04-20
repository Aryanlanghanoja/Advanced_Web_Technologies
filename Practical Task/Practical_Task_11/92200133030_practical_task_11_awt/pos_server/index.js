const express = require('express');
const app = express();
const sequelize = require('./utils/database');
const itemRoutes = require('./routes/item.routes');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use('/api/items', itemRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running at http://localhost:3000'));
  })
  .catch(err => console.error('DB Sync Error:', err));